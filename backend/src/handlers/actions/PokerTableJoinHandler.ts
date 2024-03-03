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
    if (join_room.error) {
      // TODO: should have a switch on the possible errors for endpoints, this will be even more clear when we have
      // a dealer doing the above
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
      const event = 'start_game';
      const payload = {
        tableName: 'table_1',
      };
      const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);
      if (sendEvents.error) {
        return Result.error(sendEvents.error);
      }
    }
    return res.send({ ok: true });
  }
}

export { PokerTableJoinHandler };
