// Types
import type { Request, Response, NextFunction } from 'express';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from '../../shared/api/PokerTables/types/PokerTableLeave';
import { IBaseError } from '@Infra/Result';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { Result } from '@Infra/Result';
import { pokerTableLeaveSchema } from '@Shared/api/PokerTables/types/PokerTableLeave';
import { PokerTableDoesNotExistError } from '@Shared/api/PokerTables/errors';
import { Logger } from '../../utils/Logger';
import { mapBaseErrorToAPIError } from '../helpers/mapBaseErrorToAPIError';

const debug = Logger.newDebugger('APP:PokerTableLeaveHandler');

/**
 * PokerTableLeaveHandler is used to handle requests to leave a poker table
 */
class PokerTablesLeaveHandler extends BaseHandler<PokerTableLeavePayload, PokerTableLeaveOutput> {
  constructor() {
    super(pokerTableLeaveSchema);
  }

  protected getResult(
    payload: Result<PokerTableLeavePayload>,
    res: Response<PokerTableLeaveOutput>,
    next: NextFunction
  ) {
    const seatNumber = payload.getValue().selectedSeatNumber;
    const clientId = payload.getValue().socketId;
    const pokerTable = GameLobbyService.getTable('table_1');
    if (!pokerTable) {
      return next(new PokerTableDoesNotExistError());
    }

    const leaveRoom = pokerTable.leaveTable(seatNumber, clientId);
    if (leaveRoom.isError()) {
      debug(leaveRoom.getError());
      return next(leaveRoom.getError());
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_left';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    const sendEvents = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return next(sendEvents.getError());
    }
    return res.send({ ok: true });
  }
}

function pokerTablesLeaveErrorHandler(err: IBaseError, req: Request, res: Response, next: NextFunction) {
  switch (err.code) {
    case 'player_not_found_at_table':
    case 'table_does_not_exist':
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(err),
      });
  }
  next(err); // Pass to the next error handler if it's not a SpecificError
}

export { PokerTablesLeaveHandler, pokerTablesLeaveErrorHandler };
