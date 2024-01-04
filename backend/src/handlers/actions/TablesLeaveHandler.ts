// External modules
import { Request, Response } from 'express';
import Rooms from '../../sockets/Rooms';
import PokerTable from '../../game/PokerTable';

// Internal modules
import Logger from '../../utils/Logger';
import { PlayerLeavePayload, PlayerLeaveOutput } from '../../shared/api/types/PlayerLeave';
import BaseHandler from '../../shared/BaseHandler';

const debug = Logger.newDebugger('APP:Routes:actions');


class TablesLeaveHandler extends BaseHandler<PlayerLeaveOutput> {
  constructor() {
    super();
  }

  protected getResult(req: Request, res: Response<PlayerLeaveOutput>) {
    const body = req.body as PlayerLeavePayload;
    const seatNumber = body.selectedSeatNumber;
    const clientId = body.socketId;
    const leave_room = PokerTable.leaveTable('table_1', seatNumber, clientId);
    if (!leave_room.ok) {
      return res.send({
        ok: false,
        error: leave_room.errorMessage,
      });
    }
    // Emit event to all clients connected that a player has sat down
    let event = 'player_left';
    let payload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    let send_events = Rooms.sendEventToRoom('table_1', event, payload);
    if (!send_events.ok) {
      return res.send({
        ok: false,
        error: send_events.errorMessage,
      });
    }
    return res.send({ ok: true });
  }
}

export default TablesLeaveHandler;

