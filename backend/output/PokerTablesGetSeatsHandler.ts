import { ResultError, ResultSuccess } from '@infra/Result';
import {
    PokerTablesGetSeatsOutputSchema,
    PokerTablesGetSeatsPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTablesGetSeatsOutputSchema';
import {
    PokerTablesGetSeatsErrorCodes,
    PokerTablesGetSeatsOutput,
    PokerTablesGetSeatsPayload,
} from '@shared/api/poker-tables/types/PokerTablesGetSeats';

import { BaseHandler } from '../BaseHandler';
import { PokerTableDoesNotExistError } from './errors/PokerTableDoesNotExistError';

export class PokerTablesGetSeatsHandler extends BaseHandler<PokerTablesGetSeatsPayload, PokerTablesGetSeatsOutput> {
  constructor() {
    super(PokerTablesGetSeatsPayloadSchema, PokerTablesGetSeatsOutputSchema, PokerTablesGetSeatsErrorCodes);
  }

  protected async getResult(payload: PokerTablesGetSeatsPayload) {


    return new ResultSuccess({ ok: true, seats: filteredSeats });
  }
}
