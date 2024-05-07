import { EventEmitter } from 'events';

import { ResultError } from '@infra/Result';
import { GameEvent } from '@shared/websockets/game/types/GameEvents';

import { Dealer } from '../game/Dealer';
import { Player } from '../game/Player';
import { PokerTable } from '../game/PokerTable';
import { Seat } from '../game/Seat';
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
  }

  private static async dealCards(pokerTable: PokerTable) {
    Dealer.dealCards(pokerTable);

    const seats = pokerTable.getSeats();

    this.sendHoleCardsToPlayers(seats);
  }

  private static async sendHoleCardsToPlayers(seats: Seat[]) {
    seats.forEach(async (seat) => {
      const player = seat.getPlayer();
      if (player) {
        const sessionId = await UserService.getSessionId(player);
        const dealCardsEvent = GameEvent.DEAL_CARDS;
        const payload = { cards: player.getCards() };

        Sockets.sendEventToClient(sessionId, dealCardsEvent, payload);
      }
    });
  }
}
