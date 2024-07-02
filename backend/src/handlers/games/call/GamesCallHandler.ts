import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesCallOutput, GamesCallPayload } from '@shared/api/gen/games/types/GamesCall';

import { GameDoesNotExistError } from '../errors/gen/GameDoesNotExistError';
import { NotPlayersTurnError } from '../errors/gen/NotPlayersTurnError';
import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesCallHandler } from './gen/AbstractGamesCallHandler';

export class GamesCallHandler extends AbstractGamesCallHandler {
  protected async getResult(payload: GamesCallPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesCallOutput>();
  }
}
