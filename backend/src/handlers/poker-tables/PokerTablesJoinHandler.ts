// Types
import type { Request, Response, NextFunction } from 'express';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from '../../shared/api/PokerTables/types/PokerTableJoin';
import { IBaseError } from '@Infra/Result';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result } from '@Infra/Result';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { pokerTableJoinSchema } from '@Shared/api/PokerTables/types/PokerTableJoin';
import { PokerTableDoesNotExistError } from '@Shared/api/PokerTables/errors';
import { mapBaseErrorToAPIError } from '../helpers/mapBaseErrorToAPIError';

import { Logger } from '../../utils/Logger';

const debug = Logger.newDebugger('APP:PokerTableJoinHandler');

/**
 * PokerTableJoinHandler is used to handle requests to join a poker table
 */
class PokerTablesJoinHandler extends BaseHandler<PokerTableJoinPayload, PokerTableJoinOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(pokerTableJoinSchema);
  }

  protected getResult(payload: Result<PokerTableJoinPayload>, res: Response<PokerTableJoinOutput>, next: NextFunction) {
    const seatNumber = payload.getValue().selectedSeatNumber;
    const clientId = payload.getValue().socketId;

    const pokerTable = GameLobbyService.getTable('table_1');

    if (!pokerTable) {
      return next(new PokerTableDoesNotExistError());
    }

    const joinRoom = pokerTable.sitAtTable(seatNumber, clientId);
    if (joinRoom.isError()) {
      debug(joinRoom.getError());
      return next(joinRoom.getError());
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
      return next(sendEvents.getError());
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
        return next(sendEvents.getError());
      }
    }
    // throw new Error('Method not implemented.');
    return res.send({ ok: true });
  }
}

function pokerTablesJoinErrorHandler(err: IBaseError, req: Request, res: Response, next: NextFunction) {
  switch (err.code) {
    case 'seat_taken':
    case 'player_already_seated':
    case 'table_does_not_exist':
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(err),
      });
  }
  next(err); // Pass to the next error handler if it's not a SpecificError
}

export { PokerTablesJoinHandler, pokerTablesJoinErrorHandler };
