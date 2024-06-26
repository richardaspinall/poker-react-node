import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesBetOutput, GamesBetPayload } from '@shared/api/gen/games/types/GamesBet';

import { GameDoesNotExist } from '../errors/gen/GameDoesNotExist';
import { NotPlayersTurn } from '../errors/gen/NotPlayersTurn';
import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesBetHandler } from './gen/AbstractGamesBetHandler';

export class GamesBetHandler extends AbstractGamesBetHandler {
  protected async getResult(payload: GamesBetPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesBetOutput>();
  }
}
