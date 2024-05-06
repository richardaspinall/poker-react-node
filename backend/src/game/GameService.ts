import { EventEmitter } from 'events';

import { ResultError } from '@infra/Result';
import { PlayerJoinedEvent } from '@shared/websockets/poker-tables/types/PokerTableEvents';

import { Player } from '../game/Player';
import { Rooms } from '../sockets/Rooms';
import { Sockets } from '../sockets/Sockets';
import { UserRepository } from '../users/UserRepository';
import { Logger } from '../utils/Logger';
import { Dealer } from './Dealer';
import { PokerTable } from './PokerTable';

const debug = Logger.newDebugger('APP:GameService');

export class GameService {
  public static eventEmitter = new EventEmitter();

  // Initializes any necessary listeners or setup required for the Dealer
  public static initialize() {
    GameService.eventEmitter.on('playerJoined', GameService.onPlayerJoined);
    // Setup can be expanded as needed
  }

  // Notifies when a player is added and checks if the table is ready
  public static onPlayerJoined(pokerTable: PokerTable, player: Player, seatNumber: string) {
    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const playerJoinedEventPayload = {
      username: player.getUserName(),
      seatNumber: seatNumber,
    };

    const sendEvents = Rooms.sendEventToRoom<PlayerJoinedEvent>('table_1', event, playerJoinedEventPayload);

    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return new ResultError(sendEvents.getError());
    }

    if (pokerTable.isPokerTableReady()) {
      GameService.startGame(pokerTable);
    }
  }

  // TODO: for now we should do all Rooms or sockets related logic in the GameService (so need to remove from Dealer.dealCards and get back cards to send to the sockets)
  // There should be a Game.startGame which is actually called from onPlayerJoined
  public static async startGame(pokerTable: PokerTable) {
    const event = 'start_game';
    const payload = { tableName: pokerTable.getName() };

    const sendEvents = Rooms.sendEventToRoom(pokerTable.getName(), event, payload);

    if (sendEvents.isError()) {
      // debug(sendEvents.getError());
      throw sendEvents.getError();
    }

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

        const dealCardsEvent = 'deal_cards';

        const payload = { cards: player.getCards() };

        Sockets.sendEventToClient(playerSessionIdOrError.getValue(), dealCardsEvent, payload);
      }
    });
  }
}
