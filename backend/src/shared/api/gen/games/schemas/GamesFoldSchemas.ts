import Joi from 'joi';

import { GamesFoldOutput, GamesFoldPayload } from '../types/GamesFold';

export const GamesFoldPayloadSchema = Joi.object<GamesFoldPayload>({ pokerTableName: Joi.string().required() }).unknown(
  false,
);

export const GamesFoldOutputSchema = Joi.object<GamesFoldOutput>({ ok: Joi.boolean().required() }).unknown(false);
