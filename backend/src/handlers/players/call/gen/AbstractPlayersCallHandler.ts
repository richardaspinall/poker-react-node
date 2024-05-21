/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersCallPayload, PlayersCallOutput } from '@shared/api/gen/players/types/PlayersCall';

import { AbstractPlayersCallHandler } from './gen/AbstractPlayersCallHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class PlayersCallHandler extends AbstractPlayersCallHandler {
  protected async getResult(payload: PlayersCallPayload) {
    return new ResultSuccess<PlayersCallOutput>();
  }
}
*/
import { PlayersCallOutputSchema, PlayersCallPayloadSchema } from '@shared/api/gen/players/schemas/PlayersCallSchemas';
import {
  PlayersCallErrorCodes,
  PlayersCallOutput,
  PlayersCallPayload,
} from '@shared/api/gen/players/types/PlayersCall';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPlayersCallHandler extends BaseHandler<PlayersCallPayload, PlayersCallOutput> {
  constructor() {
    super(PlayersCallPayloadSchema, PlayersCallOutputSchema, PlayersCallErrorCodes);
  }
}
