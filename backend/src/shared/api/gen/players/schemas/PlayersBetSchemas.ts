import Joi from 'joi';

import { PlayersBetOutput, PlayersBetPayload } from '../types/PlayersBet';

export const PlayersBetPayloadSchema = Joi.object<PlayersBetPayload>({
  betAmount: Joi.number().required(),
  pokerTableName: Joi.string().required(),
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const PlayersBetOutputSchema = Joi.object<PlayersBetOutput>({ ok: Joi.boolean().required() }).unknown(false);
