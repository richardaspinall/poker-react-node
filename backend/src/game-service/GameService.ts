import { EventEmitter } from 'events';

import { ResultError } from '@infra/Result';
import { GameEvent } from '@shared/websockets/game/types/GameEvents';

import { Player } from '../game/Player';
import { PokerTable } from '../game/PokerTable';
import { Rooms } from '../sockets/Rooms';
import { Sockets } from '../sockets/Sockets';
import { UserService } from '../users/UserService';
import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:GameService');

export class GameService {
  public static readonly eventEmitter = new EventEmitter();

  // Initializes any necessary listeners or setup required for the Dealer
  public static initialize() {
    GameService.eventEmitter.on('playerJoined', GameService.onPlayerJoined);
    GameService.eventEmitter.on('sendHoleCards', GameService.onSendHoleCards);
    GameService.eventEmitter.on('notifyPlayerToAct', GameService.onNotifyPlayerToAct);
    GameService.eventEmitter.on('startGame', GameService.onStartGame);
  }

  // Notifies when a player is added and starts game if the table is ready
  public static onPlayerJoined(pokerTable: PokerTable, player: Player, seatNumber: number) {
    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const playerJoinedEventPayload = {
      username: player.getUsername(),
      seatNumber: seatNumber,
    };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, playerJoinedEventPayload);

    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return new ResultError(sendEvents.getError());
    }
  }

  private static async onStartGame(pokerTable: PokerTable) {
    const event = GameEvent.START_GAME;
    const payload = { tableName: pokerTable.getName() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }

  private static async onSendHoleCards(player: Player) {
    const sessionId = await UserService.getSessionId(player);
    const payload = { cards: player.getCards() };

    const sendEvents = Sockets.sendEventToClient(sessionId, GameEvent.DEAL_CARDS, payload);

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
}
