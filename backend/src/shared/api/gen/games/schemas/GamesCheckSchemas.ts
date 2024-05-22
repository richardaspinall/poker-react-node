import Joi from 'joi';

import { GamesCheckOutput, GamesCheckPayload } from '../types/GamesCheck';

export const GamesCheckPayloadSchema = Joi.object<GamesCheckPayload>({
  pokerTableName: Joi.string().required(),
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const GamesCheckOutputSchema = Joi.object<GamesCheckOutput>({ ok: Joi.boolean().required() }).unknown(false);
