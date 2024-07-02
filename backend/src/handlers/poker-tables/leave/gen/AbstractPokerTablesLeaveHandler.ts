/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { PokerTablesLeavePayload, PokerTablesLeaveOutput } from '@shared/api/gen/poker-tables/types/PokerTablesLeave';


import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPokerTablesLeaveHandler } from './gen/AbstractPokerTablesLeaveHandler';

export class PokerTablesLeaveHandler extends AbstractPokerTablesLeaveHandler {
  protected async getResult(payload: PokerTablesLeavePayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<PokerTablesLeaveOutput>();
  }
}
*/
import {
  PokerTablesLeaveOutputSchema,
  PokerTablesLeavePayloadSchema,
} from '@shared/api/gen/poker-tables/schemas/PokerTablesLeaveSchemas';
import {
  PokerTablesLeaveErrorCodes,
  PokerTablesLeaveOutput,
  PokerTablesLeavePayload,
} from '@shared/api/gen/poker-tables/types/PokerTablesLeave';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPokerTablesLeaveHandler extends BaseHandler<
  PokerTablesLeavePayload,
  PokerTablesLeaveOutput
> {
  constructor() {
    super(PokerTablesLeavePayloadSchema, PokerTablesLeaveOutputSchema, PokerTablesLeaveErrorCodes);
  }
}
