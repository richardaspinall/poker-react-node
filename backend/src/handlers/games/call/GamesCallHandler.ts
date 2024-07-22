import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCallOutput, GamesCallPayload } from '@shared/api/gen/games/types/GamesCall';

import { GameLobbyService } from '../../../game-lobby-service';
import { Dealer } from '../../../game/Dealer';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesCallHandler } from './gen/AbstractGamesCallHandler';

export class GamesCallHandler extends AbstractGamesCallHandler {
  protected async getResult(payload: GamesCallPayload, userId: number) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const foldPlayer = Dealer.actionHandler(pokerTable, 'call', 0, userId);
    if (foldPlayer.isError()) {
      return new ResultError(foldPlayer.getError());
    }

    return new ResultSuccess<GamesCallOutput>({ ok: true });
  }
}
