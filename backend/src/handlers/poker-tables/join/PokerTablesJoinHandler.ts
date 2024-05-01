import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesJoinOutput, PokerTablesJoinPayload } from '@shared/api/gen/poker-tables/types/PokerTablesJoin';
import { PlayerJoinedEvent } from '@shared/websockets/poker-tables/types/PokerTableEvents';

import { GameLobbyService } from '../../../game-lobby-service';
import { Rooms } from '../../../sockets/Rooms';
import { UserService } from '../../../users/UserService';
import { Logger } from '../../../utils/Logger';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPokerTablesJoinHandler } from './gen/AbstractPokerTablesJoinHandler';

const debug = Logger.newDebugger('APP:PokerTableJoinHandler');

/**
 * PokerTableJoinHandler is used to handle requests to join a poker table
 */
class PokerTablesJoinHandler extends AbstractPokerTablesJoinHandler {
  protected async getResult(payload: PokerTablesJoinPayload, userId: number) {
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

    const joinRoom = pokerTable.addPlayer(seatNumber, user);

    if (joinRoom.isError()) {
      debug(joinRoom.getError());
      return new ResultError(joinRoom.getError());
    }

    // Emit event to all clients connected that a player has sat down
    const event = 'player_joined';
    const playerJoinedEventPayload = {
      username: user.getUserName(),
      seatNumber: seatNumber,
    };

    // TODO: maybe shouldn't happen here
    const sendEvents = Rooms.sendEventToRoom<PlayerJoinedEvent>('table_1', event, playerJoinedEventPayload);

    if (sendEvents.isError()) {
      debug(sendEvents.getError());
      return new ResultError(sendEvents.getError());
    }

    const tableIsReady = pokerTable.isPokerTableReady();

    if (tableIsReady) {
      const event = 'start_game';
      const payload = {
        tableName: 'table_1',
      };
      const sendEvents = Rooms.sendEventToRoom('table_1', event, payload);

      if (sendEvents.isError()) {
        debug(sendEvents.getError());
        return new ResultError(sendEvents.getError());
      }
    }

    return new ResultSuccess<PokerTablesJoinOutput>({ ok: true });
  }
}

export { PokerTablesJoinHandler };
