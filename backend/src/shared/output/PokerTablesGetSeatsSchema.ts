import Joi from 'joi';

import { PokerTablesGetSeatsOutput, PokerTablesGetSeatsPayload } from '../types/PokerTablesGetSeats';

export const PokerTablesGetSeatsPayloadSchema = Joi.object<PokerTablesGetSeatsPayload>({pokerTableName: Joi.string().required()
});

export const PokerTablesGetSeatsOutputSchema = Joi.object<PokerTablesGetSeatsOutput>({ok: Joi.boolean().required(),seats: Joi.array().items(
      Joi.object({
        seatNumber: Joi.string().required(),
        username: Joi.string().optional().allow('')
      }),
    
    ).required()
}).unknown(false);
