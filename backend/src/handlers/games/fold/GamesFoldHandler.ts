import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesFoldOutput, GamesFoldPayload } from '@shared/api/gen/games/types/GamesFold';

import { PlayerAlreadyFolded } from '../errors/gen/PlayerAlreadyFolded';
import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesFoldHandler } from './gen/AbstractGamesFoldHandler';

export class GamesFoldHandler extends AbstractGamesFoldHandler {
  protected async getResult(payload: GamesFoldPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesFoldOutput>();
  }
}
