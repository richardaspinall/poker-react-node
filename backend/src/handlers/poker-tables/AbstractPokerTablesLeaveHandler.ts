import {
  PokerTablesLeaveOutputSchema,
  PokerTablesLeavePayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTablesLeaveSchemas';
import {
  PokerTablesLeaveErrorCodes,
  PokerTablesLeaveOutput,
  PokerTablesLeavePayload,
} from '@shared/api/poker-tables/types/PokerTablesLeave';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractPokerTablesLeaveHandler extends BaseHandler<
  PokerTablesLeavePayload,
  PokerTablesLeaveOutput
> {
  constructor() {
    super(PokerTablesLeavePayloadSchema, PokerTablesLeaveOutputSchema, PokerTablesLeaveErrorCodes);
  }
}
