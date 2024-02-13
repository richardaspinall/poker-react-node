// External modules
import { Request, Response } from 'express';
import Rooms from '../../sockets/Rooms';
import GameLobbyService from '../../game-lobby-service/';

// Internal modules
import Logger from '../../utils/Logger';
import { PlayerLeaveOutput, validateTableLeavePayload } from '../../shared/api/types/PlayerLeave';

import BaseHandler from '../../shared/BaseHandler';

const debug = Logger.newDebugger('APP:Routes:actions');

class TablesLeaveHandler extends BaseHandler<PlayerLeaveOutput> {
  constructor() {
    super();
  }

  protected getResult(req: Request, res: Response<PlayerLeaveOutput>) {
    const payload = validateTableLeavePayload(req.body);
    if (payload.isError) {
      res.status(400).send({ ok: false, error: payload.errorMessage, error_details: payload.errorDetails });
      return;
    }

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
    const send_events = Rooms.sendEventToRoom('table_1', event, payload);
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
