import { ResultError, ResultSuccess } from '@infra/Result';
import {
  PokerTableJoinErrorCodes,
  PokerTableJoinOutputSchema,
  PokerTableJoinPayloadSchema,
} from '@shared/api/poker-tables/types/PokerTableJoin';
import { PlayerJoinedEvent } from '@shared/websockets/poker-tables/types/PokerTableEvents';

import { GameLobbyService } from '../../game-lobby-service';
import type { PokerTableJoinOutput, PokerTableJoinPayload } from '../../shared/api/poker-tables/types/PokerTableJoin';
import { Rooms } from '../../sockets/Rooms';
import { Logger } from '../../utils/Logger';
import { BaseHandler } from '../BaseHandler';
import { PokerTableDoesNotExistError } from './errors';

const debug = Logger.newDebugger('APP:PokerTableJoinHandler');

/**
 * PokerTableJoinHandler is used to handle requests to join a poker table
 */
class PokerTablesJoinHandler extends BaseHandler<PokerTableJoinPayload, PokerTableJoinOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(PokerTableJoinPayloadSchema, PokerTableJoinOutputSchema, PokerTableJoinErrorCodes);
  }

  protected async getResult(payload: PokerTableJoinPayload, username: string) {
    const seatNumber = payload.selectedSeatNumber;

    const pokerTable = GameLobbyService.getPokerTable('table_1');

    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const joinRoom = pokerTable.addPlayer(seatNumber, username);

    if (joinRoom.isError()) {
      debug(joinRoom.getError());
      return new ResultError(joinRoom.getError());
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const playerJoinedEventPayload = {
      username: username,
      seatNumber: seatNumber,
    };

    // TODO: maybe shouldn't happen here
    const sendEvents = Rooms.sendEventToRoom<PlayerJoinedEvent>('table_1', event, playerJoinedEventPayload);

    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return new ResultError(sendEvents.getError());
    }

    const tableIsReady = pokerTable.isPokerTableReady();

    if (tableIsReady) {
      const event = 'start_game';
      const payload = {
        tableName: 'table_1',
      };
      const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);

      if (sendEvents.isError()) {
        debug(sendEvents.getError());
        return new ResultError(sendEvents.getError());
      }
    }

    return new ResultSuccess<PokerTableJoinOutput>({ ok: true });
  }
}

export { PokerTablesJoinHandler };
