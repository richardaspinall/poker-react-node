import { EventEmitter } from 'events';

import { ResultError } from '@infra/Result';
import { GameEvent } from '@shared/websockets/game/types/GameEvents';

import { Dealer } from '../game/Dealer';
import { Player } from '../game/Player';
import { PokerTable } from '../game/PokerTable';
import { Rooms } from '../sockets/Rooms';
import { Sockets } from '../sockets/Sockets';
import { UserRepository } from '../users/UserRepository';
import { Logger } from '../utils/Logger';

const debug = Logger.newDebugger('APP:GameService');

export class GameService {
  public static eventEmitter = new EventEmitter();

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

  public static async startGame(pokerTable: PokerTable) {
    const event = GameEvent.START_GAME;
    const payload = { tableName: pokerTable.getName() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, payload);

    if (sendEvents.isError()) {
      throw sendEvents.getError();
    }

    Dealer.newGame(pokerTable);

    Dealer.dealCards(pokerTable);

    const seats = pokerTable.getSeats();

    seats.forEach(async (seat) => {
      const player = seat.getPlayer();
      if (player) {
        const playerSessionIdOrError = await UserRepository.getSessionIdByUserId(player.getUserId());
        if (playerSessionIdOrError.isError()) {
          debug(playerSessionIdOrError.getError());
          throw playerSessionIdOrError.getError();
        }

        const dealCardsEvent = GameEvent.DEAL_CARDS;

        const payload = { cards: player.getCards() };

        Sockets.sendEventToClient(playerSessionIdOrError.getValue(), dealCardsEvent, payload);
      }
    });
  }
}
