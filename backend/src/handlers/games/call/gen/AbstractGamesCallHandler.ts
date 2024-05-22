/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCallPayload, GamesCallOutput } from '@shared/api/gen/games/types/GamesCall';

import { AbstractGamesCallHandler } from './gen/AbstractGamesCallHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class GamesCallHandler extends AbstractGamesCallHandler {
  protected async getResult(payload: GamesCallPayload) {
    return new ResultSuccess<GamesCallOutput>();
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
