/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesBetPayload, GamesBetOutput } from '@shared/api/gen/games/types/GamesBet';

import { AbstractGamesBetHandler } from './gen/AbstractGamesBetHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class GamesBetHandler extends AbstractGamesBetHandler {
  protected async getResult(payload: GamesBetPayload) {
    return new ResultSuccess<GamesBetOutput>();
  }
}
*/
import { GamesBetOutputSchema, GamesBetPayloadSchema } from '@shared/api/gen/games/schemas/GamesBetSchemas';
import { GamesBetErrorCodes, GamesBetOutput, GamesBetPayload } from '@shared/api/gen/games/types/GamesBet';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractGamesBetHandler extends BaseHandler<GamesBetPayload, GamesBetOutput> {
  constructor() {
    super(GamesBetPayloadSchema, GamesBetOutputSchema, GamesBetErrorCodes);
  }
}
