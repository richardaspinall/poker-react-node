/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersBetPayload, PlayersBetOutput } from '@shared/api/gen/players/types/PlayersBet';

import { AbstractPlayersBetHandler } from './gen/AbstractPlayersBetHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class PlayersBetHandler extends AbstractPlayersBetHandler {
  protected async getResult(payload: PlayersBetPayload) {
    return new ResultSuccess<PlayersBetOutput>();
  }
}
*/
import { PlayersBetOutputSchema, PlayersBetPayloadSchema } from '@shared/api/gen/players/schemas/PlayersBetSchemas';
import { PlayersBetErrorCodes, PlayersBetOutput, PlayersBetPayload } from '@shared/api/gen/players/types/PlayersBet';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPlayersBetHandler extends BaseHandler<PlayersBetPayload, PlayersBetOutput> {
  constructor() {
    super(PlayersBetPayloadSchema, PlayersBetOutputSchema, PlayersBetErrorCodes);
  }
}
