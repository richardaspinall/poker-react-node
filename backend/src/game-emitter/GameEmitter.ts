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
}
