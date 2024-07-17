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
import { PlayerBetInvalid } from './errors/PlayerBetInvalid';
import { PlayerActionUndefined } from './errors/PlayerActionUndefined';
import { SeatUndefined } from './errors/SeatUndefined';

type PlayersCurrentBets = { seatNumber: number; currentBet: number; chipCount: number };

export class Dealer {
  public static newGame(pokerTable: PokerTable) {
    const smallBlind = 50;
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

    Dealer.takeBlinds(pokerTable);
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

  public static dealFlop(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = game.getDeck();
    const communityCards = deck.draw(3);

    game.getGameState().updateCommunityCards(communityCards);

    GameEmitter.eventEmitter.emit('dealFlop', pokerTable.getName(), communityCards);
  }

  public static dealTurn(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = game.getDeck();
    const turn = deck.draw(1);

    const currentCommunityCards = game.getGameState().getCommunityCards();
    currentCommunityCards.push(turn[0]);
    game.getGameState().updateCommunityCards(currentCommunityCards);

    GameEmitter.eventEmitter.emit('dealTurn', pokerTable.getName(), currentCommunityCards);
  }

  public static dealRiver(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = game.getDeck();
    const river = deck.draw(1);

    const currentCommunityCards = game.getGameState().getCommunityCards();
    currentCommunityCards.push(river[0]);
    game.getGameState().updateCommunityCards(currentCommunityCards);

    GameEmitter.eventEmitter.emit('dealRiver', pokerTable.getName(), currentCommunityCards);
  }

  public static takeBlinds(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const smallBlind = game.getGameState().getSmallBlind();
    const bigBlind = game.getGameState().getBigBlind();

    const smallBlindSeat = pokerTable.getSeatBySeatNumber(game.getGameState().getSeatToAct());
    if (!smallBlindSeat) {
      throw new Error('Small blind seat not found');
    }

    const bigBlindSeat = pokerTable.getSeatBySeatNumber(
      (game.getGameState().getSeatToAct() % pokerTable.getSeatCount()) + 1,
    );
    if (!bigBlindSeat) {
      throw new Error('Big blind seat not found');
    }

    smallBlindSeat.getPlayer()?.setCurrentBet(smallBlind);
    smallBlindSeat.getPlayer()?.updateChipCount(-smallBlind);
    bigBlindSeat.getPlayer()?.setCurrentBet(bigBlind);
    bigBlindSeat.getPlayer()?.updateChipCount(-bigBlind);
    bigBlindSeat.getPlayer()?.setPlayerAction('bet');

    game.getGameState().updateCurrentBet(bigBlind);
    game.getGameState().setCurrentAction('bet');
    game.getGameState().setLastRaisedBy(bigBlindSeat.getSeatNumber());

    GameEmitter.eventEmitter.emit(
      'takeBlinds',
      pokerTable.getName(),
      smallBlindSeat.getSeatNumber(),
      bigBlindSeat.getSeatNumber(),
    );
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
    if (game.getGameState().getSeatToAct() !== seat?.getSeatNumber()) {
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

  public static getPlayersCurrentBets(pokerTable: PokerTable): PlayersCurrentBets[] {
    const playersCurrentBets: PlayersCurrentBets[] = [];
    pokerTable.getSeats().forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        playersCurrentBets.push({
          chipCount: player.getChipCount(),
          seatNumber: seat.getSeatNumber(),
          currentBet: player.getCurrentBet(),
        });
      }
    });

    return playersCurrentBets;
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

    const player = pokerTable.getPlayerBySeatNumber(nextSeatToAct);

    if (!player) {
      throw new Error(`Player not found: ${nextSeatToAct}`);
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

  public static resetPlayersTurn(pokerTable: PokerTable) {
    pokerTable.getSeats().forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        player.resetPlayer();
      }
    });
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

    const seat = pokerTable.getSeatByUserId(userid);
    if (seat === undefined) {
      return Result.error(new SeatUndefined());
    }

    const currentSeatToAct = game.getGameState().getSeatToAct();
    if (currentSeatToAct !== seat.getSeatNumber()) {
      return Result.error(new NotPlayersTurnError());
    }

    const player = seat.getPlayer();
    if (player === undefined) {
      return Result.error(new PlayerNotFoundAtTableError());
    }

    const actionRank = {
      initial: -1,
      fold: 0,
      check: 1,
      call: 2,
      bet: 3,
      raise: 4,
    };

    if (playerAction === 'bet' && (currentAction === 'bet' || currentAction === 'raise')) {
      playerAction = 'raise';
    }

    const playersCurrentBet = player.getCurrentBet();
    const currentGameBet = pokerTable.getGame()?.getGameState().getCurrentBet();

    if (!currentGameBet) {
      throw new Error('Current bet is undefined');
    }

    switch (playerAction) {
      case 'fold':
        this.foldCards(pokerTable, userid);
        player?.setPlayerAction(playerAction);
        break;
      case 'check':
        if (
          actionRank[currentAction] > 2 &&
          pokerTable.getGame()?.getGameState().getLastRaisedBy() !== currentSeatToAct
        ) {
          return Result.error(new PlayerActionInvalid());
        }

        player?.setPlayerAction(playerAction);
        break;
      case 'call':
        if (
          actionRank[currentAction] < 3 ||
          pokerTable.getGame()?.getGameState().getLastRaisedBy() === currentSeatToAct
        ) {
          return Result.error(new PlayerActionInvalid());
        }
        player?.setPlayerAction(playerAction);
        player?.setCurrentBet(currentGameBet);
        player?.updateChipCount(-(currentGameBet - playersCurrentBet));

        GameEmitter.eventEmitter.emit(
          'playerBet',
          pokerTable.getName(),
          seat.getSeatNumber(),
          currentGameBet,
          player.getChipCount(),
        );
        break;
      case 'bet':
        if (playerBet < currentGameBet){
          return Result.error(new PlayerBetInvalid());
        }

        pokerTable.getGame()?.getGameState().setCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);

        player?.setCurrentBet(playerBet);
        player?.updateChipCount(-playerBet);
        player?.setPlayerAction(playerAction);
        GameEmitter.eventEmitter.emit(
          'playerBet',
          pokerTable.getName(),
          seat.getSeatNumber(),
          playerBet,
          player.getChipCount(),
        );
        break;
      case 'raise':
        if (actionRank[currentAction] < 3) {
          return Result.error(new PlayerActionInvalid());
        }

        if (playerBet < currentGameBet){
          return Result.error(new PlayerBetInvalid());
        }

        pokerTable.getGame()?.getGameState().setCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);
        pokerTable.getGame()?.getGameState().setLastRaisedBy(currentSeatToAct);

        player?.setCurrentBet(playerBet);
        player?.updateChipCount(-(playerBet - playersCurrentBet));
        player?.setPlayerAction(playerAction);
        GameEmitter.eventEmitter.emit(
          'playerBet',
          pokerTable.getName(),
          seat.getSeatNumber(),
          playerBet,
          player.getChipCount(),
        );
        break;
    }
    player?.setHadTurn();

    if (!pokerTable.hasRemainingPlayers()) {
      if (game.getGameState().getRound() === 'pre-flop') {
        let pot = 0;
        pokerTable.getSeats().forEach((seat) => {
          const bet = seat.getPlayer()?.getCurrentBet();
          if (bet) {
            pot += bet;
          }
        });

        game.getGameState().updatePot(pot);
      }
      pokerTable.getSeats().forEach((seat) => {
        const playerCards = seat.getPlayer()?.getCards();
        if (playerCards && playerCards.length > 0) {
          const player = seat.getPlayer();
          if (player) {
            player.updateChipCount(game.getGameState().getPot());
          }
        }
      });
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

    if (actionRank[nextPlayerPreviousAction] === -1 || !nextPlayerToAct?.hasHadTurn()) {
      this.updateTurn(pokerTable, nextSeatNumberToAct);
      return Result.success();
    }

    if (actionRank[nextPlayerPreviousAction] > 0) {
      if (
        actionRank[nextPlayerPreviousAction] !== actionRank[currentAction] &&
        player?.getPlayerAction() !== 'check' &&
        currentSeatToAct !== seat.getSeatNumber()
      ) {
        this.updateTurn(pokerTable, nextSeatNumberToAct);
        return Result.success();
      } else {
        const lastRaisedBy = pokerTable.getGame()?.getGameState().getLastRaisedBy();
        if (playerAction === 'raise' && nextSeatToAct?.getSeatNumber() !== lastRaisedBy) {
          this.updateTurn(pokerTable, nextSeatNumberToAct);

          return Result.success();
        }

        if (playerAction === 'bet' && actionRank[nextPlayerPreviousAction] !== 2) {
          this.updateTurn(pokerTable, nextSeatNumberToAct);

          return Result.success();
        }
      }
    }

    game.startNextRound();
    const round = game.getGameState().getRound();

    let pot = game.getGameState().getPot();

    pokerTable.getSeats().forEach((seat) => {
      const bet = seat.getPlayer()?.getCurrentBet();
      if (bet) {
        pot += bet;
      }
    });

    game.getGameState().updatePot(pot);

    GameEmitter.eventEmitter.emit('updatePot', pokerTable.getName(), pot);
    GameEmitter.eventEmitter.emit('resetBets', pokerTable.getName());

    if (round === 'flop') {
      Dealer.resetPlayersTurn(pokerTable);
      game.getGameState().setCurrentAction('check');
      game.getGameState().setLastRaisedBy(0);
      Dealer.updateTurn(pokerTable, (pokerTable.getDealerPosition() % pokerTable.getPlayerCount()) + 1);
      Dealer.dealFlop(pokerTable);
      Dealer.startTurn(pokerTable);
    }

    if (round === 'turn') {
      Dealer.resetPlayersTurn(pokerTable);
      game.getGameState().setCurrentAction('check');
      game.getGameState().setLastRaisedBy(0);

      Dealer.updateTurn(pokerTable, (pokerTable.getDealerPosition() % pokerTable.getPlayerCount()) + 1);
      Dealer.dealTurn(pokerTable);
      Dealer.startTurn(pokerTable);
    }

    if (round === 'river') {
      Dealer.resetPlayersTurn(pokerTable);
      game.getGameState().setCurrentAction('check');
      game.getGameState().setLastRaisedBy(0);
      Dealer.updateTurn(pokerTable, (pokerTable.getDealerPosition() % pokerTable.getPlayerCount()) + 1);
      Dealer.dealRiver(pokerTable);
      Dealer.startTurn(pokerTable);
    }

    if (round === 'end-game') {
      Dealer.resetPlayersTurn(pokerTable);
      Dealer.newGame(pokerTable);
    }

    return Result.success();
  }
}
