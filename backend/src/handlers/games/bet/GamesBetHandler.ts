import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesBetOutput, GamesBetPayload } from '@shared/api/gen/games/types/GamesBet';

import { GameLobbyService } from '../../../game-lobby-service';
import { Dealer } from '../../../game/Dealer';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesBetHandler } from './gen/AbstractGamesBetHandler';

export class GamesBetHandler extends AbstractGamesBetHandler {
  protected async getResult(payload: GamesBetPayload, userId: number) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const foldPlayer = Dealer.actionHandler(pokerTable, 'bet', payload.amount, userId);
    if (foldPlayer.isError()) {
      return new ResultError(foldPlayer.getError());
    }

    return new ResultSuccess<GamesBetOutput>({ ok: true });
  }
}
