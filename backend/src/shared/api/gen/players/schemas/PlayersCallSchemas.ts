import Joi from 'joi';

import { PlayersCallOutput, PlayersCallPayload } from '../types/PlayersCall';

export const PlayersCallPayloadSchema = Joi.object<PlayersCallPayload>({
  pokerTableName: Joi.string().required(),
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const PlayersCallOutputSchema = Joi.object<PlayersCallOutput>({ ok: Joi.boolean().required() }).unknown(false);
