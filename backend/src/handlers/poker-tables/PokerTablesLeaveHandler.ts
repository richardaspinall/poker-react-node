// Types
import type { Response } from 'express';
import type {
  PokerTableLeavePayload,
  PokerTableLeaveOutput,
} from '../../shared/api/poker-tables/types/PokerTableLeave';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Rooms } from '../../sockets/Rooms';
import { GameLobbyService } from '../../game-lobby-service';
import { Result } from '@infra/Result';
import { pokerTableLeaveSchema, PokerTableLeaveErrorCodes } from '@shared/api/poker-tables/types/PokerTableLeave';
import { PokerTableDoesNotExistError } from './errors';
import { Logger } from '../../utils/Logger';

const debug = Logger.newDebugger('APP:PokerTableLeaveHandler');

/**
 * PokerTableLeaveHandler is used to handle requests to leave a poker table
 */
class PokerTablesLeaveHandler extends BaseHandler<PokerTableLeavePayload, PokerTableLeaveOutput> {
  constructor() {
    super(pokerTableLeaveSchema, PokerTableLeaveErrorCodes);
  }

  protected getResult(payload: PokerTableLeavePayload, res: Response<PokerTableLeaveOutput>) {
    const seatNumber = payload.selectedSeatNumber;
    const clientId = payload.socketId;
    const pokerTable = GameLobbyService.getTable('table_1');
    if (!pokerTable) {
      return this.handleError(new PokerTableDoesNotExistError(), res);
    }

    const leaveRoom = pokerTable.leaveTable(seatNumber, clientId);
    if (leaveRoom.isError()) {
      debug(leaveRoom.getError());
      return this.handleError(leaveRoom.getError(), res);
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_left';
    const eventPayload = {
      playerId: clientId,
      seatId: seatNumber,
    };
    const sendEvents = Rooms.sendEventToRoom('table_1', event, eventPayload);
    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return this.handleError(sendEvents.getError(), res);
    }
    return res.send({ ok: true });
  }
}

export { PokerTablesLeaveHandler };
