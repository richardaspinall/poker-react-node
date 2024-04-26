import Joi from 'joi';

import { PokerTableGetSeatsNewOutput, PokerTableGetSeatsNewPayload } from '../types/PokerTableGetSeatsNew';

export const PokerTableGetSeatsNewPayloadSchema = Joi.object<PokerTableGetSeatsNewPayload>({pokerTableName: Joi.string().required()
});

export const PokerTableGetSeatsNewOutputSchema = Joi.object<PokerTableGetSeatsNewOutput>({ok: Joi.boolean().required(),seats: Joi.array().items(
      Joi.object({
        seatNumber: Joi.string().required(),
        username: Joi.string().required().allow('')
      }),
    
    ).required()
}).unknown(false);
