/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesFoldPayload, GamesFoldOutput } from '@shared/api/gen/games/types/GamesFold';


import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { NotPlayersTurn } from '../errors/gen/NotPlayersTurn';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { PlayerAlreadyFolded } from '../errors/gen/PlayerAlreadyFolded';
import { GameDoesNotExist } from '../errors/gen/GameDoesNotExist';
import { AbstractGamesFoldHandler } from './gen/AbstractGamesFoldHandler';

export class GamesFoldHandler extends AbstractGamesFoldHandler {
  protected async getResult(payload: GamesFoldPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesFoldOutput>();
  }
}
*/
import { GamesFoldOutputSchema, GamesFoldPayloadSchema } from '@shared/api/gen/games/schemas/GamesFoldSchemas';
import { GamesFoldErrorCodes, GamesFoldOutput, GamesFoldPayload } from '@shared/api/gen/games/types/GamesFold';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractGamesFoldHandler extends BaseHandler<GamesFoldPayload, GamesFoldOutput> {
  constructor() {
    super(GamesFoldPayloadSchema, GamesFoldOutputSchema, GamesFoldErrorCodes);
  }
}
