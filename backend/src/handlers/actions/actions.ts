// External modules
import { Request, Response } from 'express';
import Rooms from '../../sockets/Rooms';
import PokerTable from '../../game/PokerTable';

// Internal modules
import Logger from '../../utils/Logger';
import { PlayerSitPayload, PlayerSitOutput } from '../../shared/api/types/PlayerSit';
import BaseHandler from '../../shared/BaseHandler';

const debug = Logger.newDebugger('APP:Routes:actions');

class TablesJoinHandler extends BaseHandler<PlayerSitOutput> {
  constructor() {
    super();
  }

  protected getResult(req: Request, res: Response<PlayerSitOutput>) {
    const body = req.body as PlayerSitPayload;
    const seatNumber = body.selectedSeatNumber;
    const clientId = body.socketId;
    // Try to sit at table
    const join_room = PokerTable.sitAtTable('table_1', seatNumber, clientId);
    if (!join_room.ok) {
      return res.send({
        ok: false,
        error: join_room.errorMessage,
      });
    }
    // Emit event to all clients connected that a player has sat down
    let event = 'player_joined';
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

export default new TablesJoinHandler();
