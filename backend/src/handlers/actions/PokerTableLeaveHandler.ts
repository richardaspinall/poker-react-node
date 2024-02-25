// Types
import type { Response } from 'express';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from '../../shared/api/types/PokerTableLeave';

// Internal
import { BaseHandler } from '../../shared/BaseHandler';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { Result } from '../../shared/Result';

// Internal utils
import { Logger } from '../../utils/Logger';

// Schemas
import { pokerTableLeaveSchema } from '../../shared/api/types/PokerTableLeave';

const debug = Logger.newDebugger('APP:Routes:actions');

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
        error: 'Table does not exist',
      });
    }
    const leave_room = pokerTable.leaveTable(seatNumber, clientId);
    if (!leave_room.ok) {
      return res.send({
        ok: false,
        error: leave_room.errorMessage,
      });
    }
    // Emit event to all clients connected that a player has sat down
    const event = 'player_left';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    const send_events = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (!send_events.ok) {
      return res.send({
        ok: false,
        error: send_events.errorMessage,
      });
    }
    return res.send({ ok: true });
  }
}

export { PokerTableLeaveHandler };
