/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesJoinPayload, } from '@shared/api/poker-tables/types/PokerTablesJoin';

import { AbstractPokerTablesJoinHandler } from './gen/AbstractPokerTablesJoinHandler';

import {SeatTakenError} from './gen/errors/SeatTakenError'

import {PlayerAlreadySeatedError} from './gen/errors/PlayerAlreadySeatedError'

import {PlayerNotFoundAtTableError} from './gen/errors/PlayerNotFoundAtTableError'


export class PokerTablesJoinHandler extends AbstractPokerTablesJoinHandler {
  protected async getResult(payload: PokerTablesJoinPayload) {
    return new ResultSuccess();
  }
}
*/
import {
  PokerTablesJoinOutputSchema,
  PokerTablesJoinPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTablesJoinSchemas';
import {
  PokerTablesJoinErrorCodes,
  PokerTablesJoinOutput,
  PokerTablesJoinPayload,
} from '@shared/api/poker-tables/types/PokerTablesJoin';

import { BaseHandler } from '../../BaseHandler';

export abstract class AbstractPokerTablesJoinHandler extends BaseHandler<
  PokerTablesJoinPayload,
  PokerTablesJoinOutput
> {
  constructor() {
    super(PokerTablesJoinPayloadSchema, PokerTablesJoinOutputSchema, PokerTablesJoinErrorCodes);
  }
}
