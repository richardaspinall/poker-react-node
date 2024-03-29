// Types
import type { Response } from 'express';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from '../../shared/api/poker-tables/types/PokerTableJoin';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result } from '@infra/Result';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { pokerTableJoinSchema, PokerTableJoinErrorCodes } from '@shared/api/poker-tables/types/PokerTableJoin';
import { PokerTableDoesNotExistError } from './errors';
import { Logger } from '../../utils/Logger';

const debug = Logger.newDebugger('APP:PokerTableJoinHandler');

/**
 * PokerTableJoinHandler is used to handle requests to join a poker table
 */
class PokerTablesJoinHandler extends BaseHandler<PokerTableJoinPayload, PokerTableJoinOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(pokerTableJoinSchema, PokerTableJoinErrorCodes);
  }

  protected getResult(payload: Result<PokerTableJoinPayload>, res: Response<PokerTableJoinOutput>) {
    const seatNumber = payload.getValue().selectedSeatNumber;
    const clientId = payload.getValue().socketId;

    const pokerTable = GameLobbyService.getTable('table_1');

    if (!pokerTable) {
      return this.handleError(new PokerTableDoesNotExistError(), res);
    }

    const joinRoom = pokerTable.sitAtTable(seatNumber, clientId);
    if (joinRoom.isError()) {
      debug(joinRoom.getError());
      return this.handleError(joinRoom.getError(), res);
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };

    // TODO: maybe shouldn't happen here
    const sendEvents = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return this.handleError(sendEvents.getError(), res);
    }

    const tableIsReady = pokerTable.checkTableReady();

    if (tableIsReady) {
      const event = 'start_game';
      const payload = {
        tableName: 'table_1',
      };
      const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);
      if (sendEvents.isError()) {
        debug(sendEvents.getError());
        return this.handleError(sendEvents.getError(), res);
      }
    }
    return res.send({ ok: true });
  }
}

export { PokerTablesJoinHandler };
