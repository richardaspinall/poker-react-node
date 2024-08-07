import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesFoldOutput, GamesFoldPayload } from '@shared/api/gen/games/types/GamesFold';

import { GameLobbyService } from '../../../game-lobby-service';
import { Dealer } from '../../../game/Dealer';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesFoldHandler } from './gen/AbstractGamesFoldHandler';

export class GamesFoldHandler extends AbstractGamesFoldHandler {
  protected async getResult(payload: GamesFoldPayload, userId: number) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const foldPlayer = Dealer.actionHandler(pokerTable, 'fold', 0, userId);
    if (foldPlayer.isError()) {
      return new ResultError(foldPlayer.getError());
    }

    return new ResultSuccess<GamesFoldOutput>({ ok: true });
  }
}
