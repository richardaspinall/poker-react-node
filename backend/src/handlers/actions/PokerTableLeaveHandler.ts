// External modules
import { Response } from 'express';
import Rooms from '../../sockets/Rooms';
import GameLobbyService from '../../game-lobby-service';

// Internal modules
import BaseHandler from '../../shared/BaseHandler';
import Result from '../../shared/Result';
import Logger from '../../utils/Logger';

// Types
import {
  PokerTableLeavePayload,
  PokerTableLeaveOutput,
  pokerTableLeaveSchema,
} from '../../shared/api/types/PokerTableLeave';

const debug = Logger.newDebugger('APP:Routes:actions');

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

export default PokerTableLeaveHandler;
