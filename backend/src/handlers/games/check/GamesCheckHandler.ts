import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCheckOutput, GamesCheckPayload } from '@shared/api/gen/games/types/GamesCheck';

import { GameLobbyService } from '../../../game-lobby-service';
import { Dealer } from '../../../game/Dealer';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesCheckHandler } from './gen/AbstractGamesCheckHandler';

export class GamesCheckHandler extends AbstractGamesCheckHandler {
  protected async getResult(payload: GamesCheckPayload, userId: number) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const foldPlayer = Dealer.actionHandler(pokerTable, 'check', 0, userId);
    if (foldPlayer.isError()) {
      return new ResultError(foldPlayer.getError());
    }
    return new ResultSuccess<GamesCheckOutput>({ ok: true });
  }
}
