/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesGetSeatsPayload, PokerTablesGetSeatsOutput } from '@shared/api/gen/poker-tables/types/PokerTablesGetSeats';

import { AbstractPokerTablesGetSeatsHandler } from './gen/AbstractPokerTablesGetSeatsHandler';

import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';

export class PokerTablesGetSeatsHandler extends AbstractPokerTablesGetSeatsHandler {
  protected async getResult(payload: PokerTablesGetSeatsPayload) {
    return new ResultSuccess<PokerTablesGetSeatsOutput>();
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
