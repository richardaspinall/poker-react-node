/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { PokerTablesGetSeatsPayload, PokerTablesGetSeatsOutput } from '@shared/api/gen/poker-tables/types/PokerTablesGetSeats';


import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractPokerTablesGetSeatsHandler } from './gen/AbstractPokerTablesGetSeatsHandler';

export class PokerTablesGetSeatsHandler extends AbstractPokerTablesGetSeatsHandler {
  protected async getResult(payload: PokerTablesGetSeatsPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<PokerTablesGetSeatsOutput>();
  }
}
*/
import {
  PokerTablesGetSeatsOutputSchema,
  PokerTablesGetSeatsPayloadSchema,
} from '@shared/api/gen/poker-tables/schemas/PokerTablesGetSeatsSchemas';
import {
  PokerTablesGetSeatsErrorCodes,
  PokerTablesGetSeatsOutput,
  PokerTablesGetSeatsPayload,
} from '@shared/api/gen/poker-tables/types/PokerTablesGetSeats';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPokerTablesGetSeatsHandler extends BaseHandler<
  PokerTablesGetSeatsPayload,
  PokerTablesGetSeatsOutput
> {
  constructor() {
    super(PokerTablesGetSeatsPayloadSchema, PokerTablesGetSeatsOutputSchema, PokerTablesGetSeatsErrorCodes, false);
  }
}
