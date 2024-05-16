/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersFoldPayload, PlayersFoldOutput } from '@shared/api/gen/players/types/PlayersFold';

import { AbstractPlayersFoldHandler } from './gen/AbstractPlayersFoldHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { PlayerAlreadyFolded } from '../errors/gen/PlayerAlreadyFolded';

export class PlayersFoldHandler extends AbstractPlayersFoldHandler {
  protected async getResult(payload: PlayersFoldPayload) {
    return new ResultSuccess<PlayersFoldOutput>();
  }
}
*/
import { PlayersFoldOutputSchema, PlayersFoldPayloadSchema } from '@shared/api/gen/players/schemas/PlayersFoldSchemas';
import {
  PlayersFoldErrorCodes,
  PlayersFoldOutput,
  PlayersFoldPayload,
} from '@shared/api/gen/players/types/PlayersFold';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPlayersFoldHandler extends BaseHandler<PlayersFoldPayload, PlayersFoldOutput> {
  constructor() {
    super(PlayersFoldPayloadSchema, PlayersFoldOutputSchema, PlayersFoldErrorCodes);
  }
}
