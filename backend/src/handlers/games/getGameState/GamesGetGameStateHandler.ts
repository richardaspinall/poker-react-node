import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesGetGameStateOutput, GamesGetGameStatePayload } from '@shared/api/gen/games/types/GamesGetGameState';

import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesGetGameStateHandler } from './gen/AbstractGamesGetGameStateHandler';

export class GamesGetGameStateHandler extends AbstractGamesGetGameStateHandler {
  protected async getResult(payload: GamesGetGameStatePayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesGetGameStateOutput>();
  }
}
