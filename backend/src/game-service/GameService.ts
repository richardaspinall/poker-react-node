import { EventEmitter } from 'events';

import { ResultError } from '@infra/Result';
import { GameEvent } from '@shared/websockets/game/types/GameEvents';

import { Dealer } from '../game/Dealer';
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

    // TODO: will eventually have this be from its own api method "player is ready"
    if (pokerTable.isPokerTableReady()) {
      GameService.startGame(pokerTable);
    }
  }

  private static async startGame(pokerTable: PokerTable) {
    Dealer.newGame(pokerTable);

    const event = GameEvent.START_GAME;
    const payload = { tableName: pokerTable.getName() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }

    this.dealCards(pokerTable);

    this.notifyPlayerToAct(pokerTable);
  }

  private static async dealCards(pokerTable: PokerTable) {
    Dealer.dealCards(pokerTable);

    this.sendHoleCardsToPlayers(pokerTable);
  }

  private static async sendHoleCardsToPlayers(pokerTable: PokerTable) {
    const seats = pokerTable.getSeats();

    seats.forEach(async (seat) => {
      const player = seat.getPlayer();
      if (player) {
        const sessionId = await UserService.getSessionId(player);
        const dealCardsEvent = GameEvent.DEAL_CARDS;
        const payload = { cards: player.getCards() };

        const sendEvents = Sockets.sendEventToClient(sessionId, dealCardsEvent, payload);

        if (sendEvents.isError()) {
          throw sendEvents.getError();
        }
      }
    });
  }

  private static async notifyPlayerToAct(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const seatToAct = game.getGameState().getSeatToAct();
    const seats = pokerTable.getSeats();

    const seat = seats.find((seat) => seat.getSeatNumber() === seatToAct);

    if (!seat) {
      throw new Error(`Seat not found: ${seatToAct}`);
    }

    const event = GameEvent.SEAT_TO_ACT;
    const payload = { seatToAct: seat.getSeatNumber() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }
  }
}
