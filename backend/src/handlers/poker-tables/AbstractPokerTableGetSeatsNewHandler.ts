import {
    PokerTableGetSeatsNewOutputSchema,
    PokerTableGetSeatsNewPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTableGetSeatsNewSchemas';
import {
    PokerTableGetSeatsNewErrorCodes,
    PokerTableGetSeatsNewOutput,
    PokerTableGetSeatsNewPayload,
} from '@shared/api/poker-tables/types/PokerTableGetSeatsNew';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractPokerTableGetSeatsNewHandler extends BaseHandler<PokerTableGetSeatsNewPayload, PokerTableGetSeatsNewOutput> {
  constructor() {
    super(PokerTableGetSeatsNewPayloadSchema, PokerTableGetSeatsNewOutputSchema, PokerTableGetSeatsNewErrorCodes);
  }
}
