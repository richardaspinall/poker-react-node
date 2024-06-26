import Joi from 'joi';

import { GamesCallOutput, GamesCallPayload } from '../types/GamesCall';

export const GamesCallPayloadSchema = Joi.object<GamesCallPayload>({ pokerTableName: Joi.string().required() }).unknown(
  false,
);

export const GamesCallOutputSchema = Joi.object<GamesCallOutput>({ ok: Joi.boolean().required() }).unknown(false);
