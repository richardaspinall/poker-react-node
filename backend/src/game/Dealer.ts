import { Card } from '@shared/game/types/Card';

import { GameEmitter } from '../game-emitter';
import { GameDoesNotExistError } from '../handlers/games/errors/gen/GameDoesNotExistError';
import { NotPlayersTurnError } from '../handlers/games/errors/gen/NotPlayersTurnError';
import { PlayerAlreadyFoldedError } from '../handlers/games/errors/gen/PlayerAlreadyFoldedError';
import { PlayerNotFoundAtTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtTableError';
import { Result } from '../infra/Result';
import { Game } from './Game';
import { PokerTable } from './PokerTable';

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

    if (pokerTable.hasRemainingPlayers()) {
      Dealer.updateTurn(pokerTable);
    } else {
      Dealer.newGame(pokerTable);
    }

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

  public static updateTurn(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const currentSeatToAct = game.getGameState().getSeatToAct();
    const nextSeatToAct = (currentSeatToAct % pokerTable.getSeatCount()) + 1;

    game.getGameState().updateSeatToAct(nextSeatToAct);

    const seat = pokerTable.getSeatBySeatNumber(nextSeatToAct);
    if (!seat) {
      throw new Error(`Seat not found: ${nextSeatToAct}`);
    }

    GameEmitter.eventEmitter.emit('notifyPlayerToAct', pokerTable.getName(), seat.getSeatNumber());
  }

  public static getPlayersHoleCards(pokerTable: PokerTable, userId: number): Card[] {
    const player = pokerTable.getPlayerByUserId(userId);
    if (player) {
      return player.getCards();
    }

    return [];
  }
}
