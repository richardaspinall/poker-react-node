import Joi from 'joi';

import { PlayersFoldOutput, PlayersFoldPayload } from '../types/PlayersFold';

export const PlayersFoldPayloadSchema = Joi.object<PlayersFoldPayload>({
  pokerTableName: Joi.string().required(),
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const PlayersFoldOutputSchema = Joi.object<PlayersFoldOutput>({ ok: Joi.boolean().required() }).unknown(false);
