import Joi from 'joi';

import { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from '../types/PokerTableGetSeats';

export const PokerTableGetSeatsPayloadSchema = Joi.object<PokerTableGetSeatsPayload>({
  pokerTableName: Joi.string().required(),
});

export const PokerTableGetSeatsOutputSchema = Joi.object<PokerTableGetSeatsOutput>({
  ok: Joi.boolean().required(),
  seats: Joi.array().items(
    Joi.object({
      seatNumber: Joi.string().required(),
      username: Joi.string().allow('').required(),
    })
  ),
}).unknown(false);
