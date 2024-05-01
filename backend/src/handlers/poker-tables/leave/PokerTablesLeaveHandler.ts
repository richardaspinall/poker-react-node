import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesLeaveOutput, PokerTablesLeavePayload } from '@shared/api/gen/poker-tables/types/PokerTablesLeave';
import { PlayerLeftEvent } from '@shared/websockets/poker-tables/types/PokerTableEvents';

import { GameLobbyService } from '../../../game-lobby-service';
import { Rooms } from '../../../sockets/Rooms';
import { UserService } from '../../../users/UserService';
import { Logger } from '../../../utils/Logger';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPokerTablesLeaveHandler } from './gen/AbstractPokerTablesLeaveHandler';

const debug = Logger.newDebugger('APP:PokerTableLeaveHandler');

/**
 * PokerTableLeaveHandler is used to handle requests to leave a poker table
 */
class PokerTablesLeaveHandler extends AbstractPokerTablesLeaveHandler {
  protected async getResult(payload: PokerTablesLeavePayload, userId: number) {
    const seatNumber = payload.selectedSeatNumber;

    const pokerTable = GameLobbyService.getPokerTable('table_1');
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const userOrError = await UserService.getUserById(userId);

    if (userOrError.isError()) {
      //TODO: maybe throw exception?

      return new ResultError(userOrError.getError());
    }

    const user = userOrError.getValue();

    const leaveRoom = pokerTable.removePlayer(seatNumber, user);
    if (leaveRoom.isError()) {
      debug(leaveRoom.getError());
      return new ResultError(leaveRoom.getError());
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_left';
    const playerLeftEventPayload = {
      username: user.getUserName(),
      seatNumber: seatNumber,
    };
    const sendEvents = Rooms.sendEventToRoom<PlayerLeftEvent>('table_1', event, playerLeftEventPayload);
    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return new ResultError(sendEvents.getError());
    }
    return new ResultSuccess<PokerTablesLeaveOutput>({ ok: true });
  }
}

export { PokerTablesLeaveHandler };
