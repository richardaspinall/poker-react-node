/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesCheckPayload, GamesCheckOutput } from '@shared/api/gen/games/types/GamesCheck';


import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';
import { AbstractGamesCheckHandler } from './gen/AbstractGamesCheckHandler';

export class GamesCheckHandler extends AbstractGamesCheckHandler {
  protected async getResult(payload: GamesCheckPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesCheckOutput>();
  }
}
*/
import { GamesCheckOutputSchema, GamesCheckPayloadSchema } from '@shared/api/gen/games/schemas/GamesCheckSchemas';
import { GamesCheckErrorCodes, GamesCheckOutput, GamesCheckPayload } from '@shared/api/gen/games/types/GamesCheck';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractGamesCheckHandler extends BaseHandler<GamesCheckPayload, GamesCheckOutput> {
  constructor() {
    super(GamesCheckPayloadSchema, GamesCheckOutputSchema, GamesCheckErrorCodes);
  }
}
