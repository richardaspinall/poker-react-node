import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesJoinOutput, PokerTablesJoinPayload } from '@shared/api/gen/poker-tables/types/PokerTablesJoin';

import { GameLobbyService } from '../../../game-lobby-service';
import { Player } from '../../../game/Player';
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

    const joinRoom = pokerTable.join(seatNumber, new Player(user.getUserId(), user.getUsername()));

    if (joinRoom.isError()) {
      debug(joinRoom.getError());
      return new ResultError(joinRoom.getError());
    }

    return new ResultSuccess<PokerTablesJoinOutput>({ ok: true });
  }
}

export { PokerTablesJoinHandler };
