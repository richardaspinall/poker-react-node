// External modules
import { Response } from 'express';

// Internal modules
import BaseHandler from '../../shared/BaseHandler';
import Result from '../../shared/Result';
import Logger from '../../utils/Logger';
import Rooms from '../../sockets/Rooms';
import GameLobbyService from '../../game-lobby-service';

// Types
import {
  PokerTableJoinPayload,
  PokerTableJoinOutput,
  pokerTableJoinSchema,
} from '../../shared/api/types/PokerTableJoin';

const debug = Logger.newDebugger('APP:Routes:actions');

class PokerTableJoinHandler extends BaseHandler<PokerTableJoinPayload, PokerTableJoinOutput> {
  constructor() {
    super(pokerTableJoinSchema);
  }

  protected getResult(payload: Result<PokerTableJoinPayload>, res: Response<PokerTableJoinOutput>) {
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
    const event = 'player_joined';
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

export default PokerTableJoinHandler;
