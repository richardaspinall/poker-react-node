/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesCallPayload, GamesCallOutput } from '@shared/api/gen/games/types/GamesCall';


import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { NotPlayersTurn } from '../errors/gen/NotPlayersTurn';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { GameDoesNotExist } from '../errors/gen/GameDoesNotExist';
import { AbstractGamesCallHandler } from './gen/AbstractGamesCallHandler';

export class GamesCallHandler extends AbstractGamesCallHandler {
  protected async getResult(payload: GamesCallPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesCallOutput>();
  }
}
*/
import { GamesCallOutputSchema, GamesCallPayloadSchema } from '@shared/api/gen/games/schemas/GamesCallSchemas';
import { GamesCallErrorCodes, GamesCallOutput, GamesCallPayload } from '@shared/api/gen/games/types/GamesCall';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractGamesCallHandler extends BaseHandler<GamesCallPayload, GamesCallOutput> {
  constructor() {
    super(GamesCallPayloadSchema, GamesCallOutputSchema, GamesCallErrorCodes);
  }
}
