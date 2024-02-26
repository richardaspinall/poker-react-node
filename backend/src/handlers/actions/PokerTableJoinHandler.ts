// Types
import type { Response } from 'express';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from '../../shared/api/types/PokerTableJoin';

// Internal
import { BaseHandler } from '../../shared/BaseHandler';
import { Result } from '@shared/Result';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';

// Internal utils
import { Logger } from '../../utils/Logger';

// Schemas
import { pokerTableJoinSchema } from '../../shared/api/types/PokerTableJoin';

const debug = Logger.newDebugger('APP:Routes:actions');

/**
 * PokerTableJoinHandler is used to handle requests to join a poker table
 */
class PokerTableJoinHandler extends BaseHandler<PokerTableJoinPayload, PokerTableJoinOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
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

export { PokerTableJoinHandler };
