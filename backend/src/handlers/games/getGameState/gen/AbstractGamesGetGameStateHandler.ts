/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesGetGameStatePayload, GamesGetGameStateOutput } from '@shared/api/gen/games/types/GamesGetGameState';


import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { GameStateDoesNotExistError } from '../errors/gen/GameStateDoesNotExistError';
import { AbstractGamesGetGameStateHandler } from './gen/AbstractGamesGetGameStateHandler';

export class GamesGetGameStateHandler extends AbstractGamesGetGameStateHandler {
  protected async getResult(payload: GamesGetGameStatePayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesGetGameStateOutput>();
  }
}
*/
import {
  GamesGetGameStateOutputSchema,
  GamesGetGameStatePayloadSchema,
} from '@shared/api/gen/games/schemas/GamesGetGameStateSchemas';
import {
  GamesGetGameStateErrorCodes,
  GamesGetGameStateOutput,
  GamesGetGameStatePayload,
} from '@shared/api/gen/games/types/GamesGetGameState';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractGamesGetGameStateHandler extends BaseHandler<
  GamesGetGameStatePayload,
  GamesGetGameStateOutput
> {
  constructor() {
    super(GamesGetGameStatePayloadSchema, GamesGetGameStateOutputSchema, GamesGetGameStateErrorCodes);
  }
}
