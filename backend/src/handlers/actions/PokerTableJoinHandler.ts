// Types
import type { Response } from 'express';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from '../../shared/api/types/PokerTableJoin';

// Internal
import { BaseHandler } from '../../shared/BaseHandler';
import { Result } from '@shared/Result';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { PokerTableDoesNotExistError } from '../../shared/errors/PokerTableJoinErrors';
import { pokerTableJoinSchema } from '../../shared/api/types/PokerTableJoin';

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
        error: new PokerTableDoesNotExistError(),
      });
    }
    const join_room = pokerTable.sitAtTable(seatNumber, clientId);
    if (!join_room.ok) {
      return res.send({
        ok: false,
        error: join_room.error,
      });
    }
    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };

    // TODO: maybe shouldn't happen here, def shouldn't send back errors about rooms
    const send_events = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (send_events.error) {
      return res.send({
        ok: false,
        error: send_events.error,
      });
    }
    const tableIsReady = pokerTable.checkTableReady();
    if (tableIsReady) {
      let event = 'start_game';
      let payload = {
        tableName: 'table_1',
      };
      let send_events = Rooms.sendEventToRoom('table_1', event, payload);
      if (!send_events.ok) {
        return res.send({
          ok: false,
          error: send_events.error,
        });
      }
    }
    return res.send({ ok: true });
  }
}

export { PokerTableJoinHandler };
