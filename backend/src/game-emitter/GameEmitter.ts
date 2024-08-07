import { EventEmitter } from 'events';

import { Card } from '@shared/game/types/Card';
import { GameEvent } from '@shared/websockets/game/types/GameEvents';
import { PokerTableEvent } from '@shared/websockets/poker-tables/types/PokerTableEvents';

import { PokerTable } from '../game/PokerTable';
import { Rooms } from '../sockets/Rooms';
import { Sockets } from '../sockets/Sockets';
import { UserService } from '../users/UserService';

export class GameEmitter {
  public static readonly eventEmitter = new EventEmitter();

  public static initialize() {
    GameEmitter.eventEmitter.on('playerJoined', GameEmitter.onPlayerJoined);
    GameEmitter.eventEmitter.on('foldCards', GameEmitter.onFoldCards);
    GameEmitter.eventEmitter.on('startGame', GameEmitter.onStartGame);
    GameEmitter.eventEmitter.on('notifyPlayerToAct', GameEmitter.onNotifyPlayerToAct);
    GameEmitter.eventEmitter.on('sendHoleCards', GameEmitter.onSendHoleCards);
    GameEmitter.eventEmitter.on('dealFlop', GameEmitter.onDealCommunityCards);
    GameEmitter.eventEmitter.on('dealTurn', GameEmitter.onDealCommunityCards);
    GameEmitter.eventEmitter.on('dealRiver', GameEmitter.onDealCommunityCards);
    GameEmitter.eventEmitter.on('updatePot', GameEmitter.onUpdatePot);
    GameEmitter.eventEmitter.on('playerBet', GameEmitter.onPlayerBet);
    GameEmitter.eventEmitter.on('resetBets', GameEmitter.onResetBets);
  }

  // Room events
  private static onPlayerJoined(pokerTableName: string, username: string, seatNumber: number) {
    const payload = {
      username,
      seatNumber,
    };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, PokerTableEvent.PLAYER_JOINED, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static onFoldCards(pokerTableName: string, username: string, seatNumber: number) {
    const payload = {
      username,
      seatNumber,
    };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.FOLD_CARDS, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onStartGame(pokerTable: PokerTable) {
    const payload = { tableName: pokerTable.getName() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), GameEvent.START_GAME, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onNotifyPlayerToAct(pokerTableName: string, seatToAct: number) {
    const payload = { seatToAct };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.SEAT_TO_ACT, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  // Client events
  private static async onSendHoleCards(userId: number, cards: Card[]) {
    const payload = { cards };
    const sessionId = await UserService.getSessionId(userId);

    const sendEvents = Sockets.sendEventToClient(sessionId, GameEvent.DEAL_CARDS, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onDealCommunityCards(pokerTableName: string, cards: Card[]) {
    const payload = { cards };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.DEAL_COMMUNITY_CARDS, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onUpdatePot(pokerTableName: string, pot: number) {
    const payload = { pot };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.UPDATE_POT, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onPlayerBet(pokerTableName: string, seatNumber: number, betAmount: number, chipCount: number) {
    const payload = { seatNumber, betAmount, chipCount };

    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.PLAYER_BET, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onResetBets(pokerTableName: string) {
    const sendEvents = Rooms.sendEventToRoom(pokerTableName, GameEvent.RESET_BETS, undefined);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }
}
