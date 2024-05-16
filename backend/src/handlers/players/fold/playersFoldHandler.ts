import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersFoldOutput, PlayersFoldPayload } from '@shared/api/gen/players/types/PlayersFold';

import { Rooms } from '../../../sockets/Rooms';
import { GameLobbyService } from '../../../game-lobby-service';
import { UserService } from '../../../users/UserService';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPlayersFoldHandler } from './gen/AbstractPlayersFoldHandler';
import { GameEvent } from '../../../shared/websockets/game/types/GameEvents';
import { Logger } from '../../../utils/Logger';

const debug = Logger.newDebugger('APP:PokerTableJoinHandler');

export class PlayersFoldHandler extends AbstractPlayersFoldHandler {
  protected async getResult(payload: PlayersFoldPayload, userId: number) {
    const pokerTableName = payload.pokerTableName;
    const seatNumber = payload.selectedSeatNumber;

    const pokerTable = GameLobbyService.getPokerTable(pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const foldPlayer = pokerTable.foldPlayer(seatNumber, userId);
    if (foldPlayer.isError()) {
      return new ResultError(foldPlayer.getError());
    }

    return new ResultSuccess<PlayersFoldOutput>({ ok: true });
  }
}
