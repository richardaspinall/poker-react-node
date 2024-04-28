import {
  PokerTablesGetSeatsOutputSchema,
  PokerTablesGetSeatsPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTablesGetSeatsSchemas';
import {
  PokerTablesGetSeatsErrorCodes,
  PokerTablesGetSeatsOutput,
  PokerTablesGetSeatsPayload,
} from '@shared/api/poker-tables/types/PokerTablesGetSeats';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractPokerTablesGetSeatsHandler extends BaseHandler<
  PokerTablesGetSeatsPayload,
  PokerTablesGetSeatsOutput
> {
  constructor() {
    super(PokerTablesGetSeatsPayloadSchema, PokerTablesGetSeatsOutputSchema, PokerTablesGetSeatsErrorCodes, false);
  }
}
