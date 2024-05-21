import Joi from 'joi';

import { PlayersCheckOutput, PlayersCheckPayload } from '../types/PlayersCheck';

export const PlayersCheckPayloadSchema = Joi.object<PlayersCheckPayload>({
  pokerTableName: Joi.string().required(),
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const PlayersCheckOutputSchema = Joi.object<PlayersCheckOutput>({ ok: Joi.boolean().required() }).unknown(false);
