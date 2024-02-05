// External modules
import { Request, Response } from 'express';

// Internal modules
import BaseHandler from '../../shared/BaseHandler';
import Logger from '../../utils/Logger';
import Rooms from '../../sockets/Rooms';
import GameLobbyService from '../../game-lobby-service';

// Types
import { PlayerSitOutput, validatePlayerSitPayload } from '../../shared/api/types/PlayerSit';

const debug = Logger.newDebugger('APP:Routes:actions');

class TablesJoinHandler extends BaseHandler<PlayerSitOutput> {
  constructor() {
    super();
  }

  protected getResult(req: Request, res: Response<PlayerSitOutput>) {
    const payload = validatePlayerSitPayload(req.body);
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
    const join_room = pokerTable.sitAtTable('table_1', seatNumber, clientId);
    if (!join_room.ok) {
      return res.send({
        ok: false,
        error: join_room.errorMessage,
      });
    }
    // Emit event to all clients connected that a player has sat down
    let event = 'player_joined';
    let eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    let send_events = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (!send_events.ok) {
      return res.send({
        ok: false,
        error: send_events.errorMessage,
      });
    }
    return res.send({ ok: true });
  }
}

export default TablesJoinHandler;
