// Types
import type { Response } from 'express';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from '../../shared/api/types/PokerTableJoin';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result } from '@Infra/Result';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { PokerTableDoesNotExistError } from '../../shared/errors/PokerTableJoinErrors';
import { pokerTableJoinSchema } from '../../shared/api/types/PokerTableJoin';
import { InternalError } from '@Shared/api/types/BaseOutput';

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
    if (join_room.isError()) {
      // TODO: should have a switch on the possible errors for endpoints, this will be even more clear when we have
      // a dealer doing the above

      // TODO: change to logger
      console.log('Error joining room', join_room.getError());

      return res.send({
        ok: false,
        error: new InternalError(),
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
    if (send_events.isError()) {
      // TODO: change to logger
      console.log('Error sending events', send_events.getError());

      return res.send({
        ok: false,
        error: new InternalError(),
      });
    }

    const tableIsReady = pokerTable.checkTableReady();

    if (tableIsReady) {
      const event = 'start_game';
      const payload = {
        tableName: 'table_1',
      };
      const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);
      if (sendEvents.isError()) {
        // TODO: change to logger
        console.log('Error sending events', sendEvents.getError());

        return res.send({
          ok: false,
          error: new InternalError(),
        });
      }
    }
    return res.send({ ok: true });
  }
}

export { PokerTableJoinHandler };
