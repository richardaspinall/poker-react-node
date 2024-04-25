import {
    PokerTableGetSeatsOutputSchema,
    PokerTableGetSeatsPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTableGetSeatsSchemas';
import {
    PokerTableGetSeatsErrorCodes,
    PokerTableGetSeatsOutput,
    PokerTableGetSeatsPayload,
} from '@shared/api/poker-tables/types/PokerTableGetSeats';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractPokerTableGetSeatsHandler extends BaseHandler<PokerTableGetSeatsPayload, PokerTableGetSeatsOutput> {
  constructor() {
    super(PokerTableGetSeatsPayloadSchema, PokerTableGetSeatsOutputSchema, PokerTableGetSeatsErrorCodes);
  }
}
