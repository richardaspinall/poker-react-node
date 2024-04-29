/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesJoinPayload, } from '@shared/api/gen/poker-tables/types/PokerTablesJoin';

import { AbstractPokerTablesJoinHandler } from './gen/joinAbstractPokerTablesJoinHandler';

import {SeatTakenError} from './gen/join/errors/SeatTakenError'

import {PlayerAlreadySeatedError} from './gen/join/errors/PlayerAlreadySeatedError'

import {PlayerNotFoundAtTableError} from './gen/join/errors/PlayerNotFoundAtTableError'


export class PokerTablesJoinHandler extends AbstractPokerTablesJoinHandler {
  protected async getResult(payload: PokerTablesJoinPayload) {
    return new ResultSuccess();
  }
}
*/
import {
  PokerTablesJoinOutputSchema,
  PokerTablesJoinPayloadSchema,
} from '@shared/api/gen/poker-tables/schemas/PokerTablesJoinSchemas';
import {
  PokerTablesJoinErrorCodes,
  PokerTablesJoinOutput,
  PokerTablesJoinPayload,
} from '@shared/api/gen/poker-tables/types/PokerTablesJoin';

import { BaseHandler } from '../../BaseHandler';

export abstract class AbstractPokerTablesJoinHandler extends BaseHandler<
  PokerTablesJoinPayload,
  PokerTablesJoinOutput
> {
  constructor() {
    super(PokerTablesJoinPayloadSchema, PokerTablesJoinOutputSchema, PokerTablesJoinErrorCodes);
  }
}
