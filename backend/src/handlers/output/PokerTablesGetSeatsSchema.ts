import Joi from 'joi';

import { PokerTablesGetSeatsOutput, PokerTablesGetSeatsPayload } from '../types/PokerTablesGetSeats';

export const PokerTablesGetSeatsPayloadSchema = Joi.object<PokerTablesGetSeatsPayload>({pokerTableName: Joi.string().required(),seats: Joi.array().required(),seats: Joi.array().required()
});

export const PokerTablesGetSeatsOutputSchema = Joi.object<PokerTablesGetSeatsOutput>({alias: Joi.string().optional(),isFull: Joi.boolean().required(),pokerTableName: Joi.string().required(),seats: Joi.array().items(
      Joi.object({
        seatNumber: Joi.string().required(),
        username: Joi.string().optional()
      }),
    
    ).required(),secondArray: Joi.array().items(
      Joi.array().items(
        Joi.object({seatNumber: Joi.string().required(),}),
        Joi.object({seats: Joi.array().required(),}),
        Joi.object({username: Joi.string().optional()})
      )
    
    ).required()
}).unknown(false);
