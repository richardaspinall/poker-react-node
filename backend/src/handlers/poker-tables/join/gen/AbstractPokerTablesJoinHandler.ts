/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { PokerTablesJoinPayload, PokerTablesJoinOutput } from '@shared/api/gen/poker-tables/types/PokerTablesJoin';


import { SeatTakenError } from '../errors/gen/SeatTakenError';
import { PlayerAlreadySeatedError } from '../errors/gen/PlayerAlreadySeatedError';
import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPokerTablesJoinHandler } from './gen/AbstractPokerTablesJoinHandler';

export class PokerTablesJoinHandler extends AbstractPokerTablesJoinHandler {
  protected async getResult(payload: PokerTablesJoinPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<PokerTablesJoinOutput>();
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

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPokerTablesJoinHandler extends BaseHandler<
  PokerTablesJoinPayload,
  PokerTablesJoinOutput
> {
  constructor() {
    super(PokerTablesJoinPayloadSchema, PokerTablesJoinOutputSchema, PokerTablesJoinErrorCodes);
  }
}
