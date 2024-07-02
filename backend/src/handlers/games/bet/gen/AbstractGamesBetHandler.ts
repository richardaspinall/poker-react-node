/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { GamesBetPayload, GamesBetOutput } from '@shared/api/gen/games/types/GamesBet';


import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { NotPlayersTurn } from '../errors/gen/NotPlayersTurn';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { GameDoesNotExist } from '../errors/gen/GameDoesNotExist';
import { AbstractGamesBetHandler } from './gen/AbstractGamesBetHandler';

export class GamesBetHandler extends AbstractGamesBetHandler {
  protected async getResult(payload: GamesBetPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<GamesBetOutput>();
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
