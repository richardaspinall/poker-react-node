// Types
import type { Response } from 'express';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from '../../shared/api/types/PokerTableLeave';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { Result } from '@Infra/Result';
import { pokerTableLeaveSchema, PokerTableDoesNotExistError } from '@Shared/api/types/PokerTableLeave';
import { InternalError } from '@Shared/api/types/BaseOutput';
import { Logger } from '../../utils/Logger';
import { mapBaseErrorToAPIError } from '@Shared/api/helpers/mapBaseErrorToAPIError';

const debug = Logger.newDebugger('APP:PokerTableLeaveHandler');

/**
 * PokerTableLeaveHandler is used to handle requests to leave a poker table
 */
class PokerTableLeaveHandler extends BaseHandler<PokerTableLeavePayload, PokerTableLeaveOutput> {
  constructor() {
    super(pokerTableLeaveSchema);
  }

  protected getResult(payload: Result<PokerTableLeavePayload>, res: Response<PokerTableLeaveOutput>) {
    const seatNumber = payload.getValue().selectedSeatNumber;
    const clientId = payload.getValue().socketId;
    const pokerTable = GameLobbyService.getTable('table_1');
    if (!pokerTable) {
      return res.send({
        ok: false,
        error: mapBaseErrorToAPIError(new PokerTableDoesNotExistError()),
      });
    }
    const leave_room = pokerTable.leaveTable(seatNumber, clientId);
    // TODO: should have a switch on the possible errors
    if (leave_room.isError()) {
      switch (leave_room.getError().code) {
        case 'player_not_found_at_table':
          return res.send({
            ok: false,
            error: mapBaseErrorToAPIError(leave_room.getError()),
          });
      }

      debug(leave_room.getError());
      return res.send({
        ok: false,
        error: new InternalError(),
      });
    }
    // Emit event to all clients connected that a player has sat down
    const event = 'player_left';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    const send_events = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (send_events.isError()) {
      debug(leave_room.getError());
      return res.send({
        ok: false,
        error: new InternalError(),
      });
    }
    return res.send({ ok: true });
  }
}

export { PokerTableLeaveHandler };
