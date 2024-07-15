import { Card } from '@shared/game/types/Card';

import { GameEmitter } from '../game-emitter';
import { GameDoesNotExistError } from '../handlers/games/errors/gen/GameDoesNotExistError';
import { NotPlayersTurnError } from '../handlers/games/errors/gen/NotPlayersTurnError';
import { PlayerAlreadyFoldedError } from '../handlers/games/errors/gen/PlayerAlreadyFoldedError';
import { PlayerNotFoundAtTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtTableError';
import { Result } from '../infra/Result';
import { Game } from './Game';
import { PokerTable } from './PokerTable';
import { CurrentActionUndefined } from './errors/CurrentActionUndefined';
import { PlayerActionInvalid } from './errors/PlayerActionInvalid';
import { PlayerActionUndefined } from './errors/PlayerActionUndefined';
import { SeatUndefined } from './errors/SeatUndefined';

export class Dealer {
  public static newGame(pokerTable: PokerTable) {
    const smallBlind = 1;
    const bigBlind = smallBlind * 2;

    const nextSeatToAct = (pokerTable.getDealerPosition() % pokerTable.getPlayerCount()) + 1;
    pokerTable.addGame(new Game(nextSeatToAct, smallBlind, bigBlind));

    const playerCount = pokerTable.getPlayerCount();

    // Dealer position is always the first player to act when there are 3 or less players
    if (playerCount > 3) {
      pokerTable
        .getGame()
        ?.getGameState()
        .updateSeatToAct(nextSeatToAct + 3);
    } else {
      pokerTable.getGame()?.getGameState().updateSeatToAct(nextSeatToAct);
    }

    GameEmitter.eventEmitter.emit('startGame', pokerTable);

    Dealer.dealCards(pokerTable);
    Dealer.startTurn(pokerTable);
  }

  public static dealCards(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = game.getDeck();

    const seats = pokerTable.getSeats();

    seats.forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        player.setCards(deck.draw(2));
        GameEmitter.eventEmitter.emit('sendHoleCards', player.getUserId(), player.getCards());
      }
    });
  }

  public static foldCards(pokerTable: PokerTable, userId: number) {
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExistError());
    }

    const player = pokerTable.getPlayerByUserId(userId);
    if (!player) {
      return Result.error(new PlayerNotFoundAtTableError());
    }

    const playerCards = player?.getCards();
    if (!(playerCards && playerCards.length > 0)) {
      return Result.error(new PlayerAlreadyFoldedError());
    }

    const seat = pokerTable.getSeatByUserId(userId);
    if (!(game.getGameState().getSeatToAct() === seat?.getSeatNumber())) {
      return Result.error(new NotPlayersTurnError());
    }

    player.foldCards();

    GameEmitter.eventEmitter.emit(
      'foldCards',
      pokerTable.getName(),
      player.getUsername(),
      pokerTable.getSeatByUserId(userId)?.getSeatNumber(),
    );

    return Result.success();
  }

  public static startTurn(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const seatToAct = game.getGameState().getSeatToAct();
    const seat = pokerTable.getSeatBySeatNumber(seatToAct);

    if (!seat) {
      throw new Error(`Seat not found: ${seatToAct}`);
    }

    GameEmitter.eventEmitter.emit('notifyPlayerToAct', pokerTable.getName(), seat.getSeatNumber());
  }

  public static updateTurn(pokerTable: PokerTable, nextSeatToAct: number) {
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExistError());
    }

    game.getGameState().updateSeatToAct(nextSeatToAct);

    const seat = pokerTable.getSeatBySeatNumber(nextSeatToAct);
    if (!seat) {
      throw new Error(`Seat not found: ${nextSeatToAct}`);
    }

    game.getGameState().updateSeatToAct(nextSeatToAct);
    GameEmitter.eventEmitter.emit('notifyPlayerToAct', pokerTable.getName(), nextSeatToAct);
  }

  public static getPlayersHoleCards(pokerTable: PokerTable, userId: number): Card[] {
    const player = pokerTable.getPlayerByUserId(userId);
    if (player) {
      return player.getCards();
    }

    return [];
  }

  public static actionHandler(pokerTable: PokerTable, playerAction: string, playerBet: number, userid: number) {
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExistError());
    }

    const currentAction = pokerTable.getGame()?.getGameState().getCurrentAction();
    if (currentAction === undefined) {
      return Result.error(new CurrentActionUndefined());
    }

    const lastRaisedBy = pokerTable.getGame()?.getGameState().getLastRaisedBy();

    const seat = pokerTable.getSeatByUserId(userid);
    if (seat === undefined) {
      return Result.error(new SeatUndefined());
    }

    const currentSeatToAct = game.getGameState().getSeatToAct();
    if (currentSeatToAct !== seat.getSeatNumber()) {
      return Result.error(new NotPlayersTurnError());
    }

    const player = seat.getPlayer();

    const actionRank = {
      initial: -1,
      fold: 0,
      check: 1,
      call: 2,
      bet: 3,
      raise: 4,
      // 'reraise': 5
    };

    switch (playerAction) {
      case 'fold':
        this.foldCards(pokerTable, userid);
        player?.updatePlayerAction(playerAction);
        break;
      // do we need to discern between call and check when comparing?
      // do we need to check they are allowed to check iunstead of call or will front end do that?
      case 'check':
        if (actionRank[currentAction] > 2) {
          return Result.error(new PlayerActionInvalid());
        }

        // since it will be check or call do we need to update game action?
        player?.updatePlayerAction(playerAction);
        break;
      case 'call':
        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        player?.updatePlayerAction(playerAction);
        break;
      case 'bet':
        if (actionRank[currentAction] > 3) {
          return Result.error(new PlayerActionInvalid());
        }

        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);

        player?.updatePlayerAction(playerAction);
        break;
      case 'raise':
        if (actionRank[currentAction] < 3) {
          return Result.error(new PlayerActionInvalid());
        }

        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);
        pokerTable.getGame()?.getGameState().updateLastRaisedBy(currentSeatToAct);
        player?.updatePlayerAction(playerAction);
        break;
    }

    if (!pokerTable.hasRemainingPlayers()) {
      Dealer.newGame(pokerTable);
      return Result.success();
    }

    const nextSeatNumberToAct = (currentSeatToAct % pokerTable.getSeatCount()) + 1;

    const nextSeatToAct = pokerTable.getSeatBySeatNumber(nextSeatNumberToAct);
    if (nextSeatToAct === undefined) {
      return Result.error(new SeatUndefined());
    }

    const nextPlayerToAct = nextSeatToAct.getPlayer();
    const nextPlayerPreviousAction = nextPlayerToAct?.getPlayerAction();
    if (nextPlayerPreviousAction === undefined) {
      return Result.error(new PlayerActionUndefined());
    }

    if (actionRank[nextPlayerPreviousAction] === -1) {
      this.updateTurn(pokerTable, nextSeatNumberToAct);
      return Result.success();
    }

    if (actionRank[nextPlayerPreviousAction] > 0) {
      if (actionRank[nextPlayerPreviousAction] !== actionRank[currentAction]) {
        this.updateTurn(pokerTable, nextSeatNumberToAct);
        return Result.success();
      } else {
        // Handle multiple raises
        if (playerAction === 'raise' && nextSeatToAct?.getSeatNumber() !== lastRaisedBy) {
          this.updateTurn(pokerTable, nextSeatNumberToAct);
          return Result.success();
        }
      }
    }

    game.startNextRound(); // TODO: currently just sets the round to the next round (doesn't do anything else)
    return Result.success();
  }
}
