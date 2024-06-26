import Joi from 'joi';

import { GamesBetOutput, GamesBetPayload } from '../types/GamesBet';

export const GamesBetPayloadSchema = Joi.object<GamesBetPayload>({
  betAmount: Joi.number().required(),
  pokerTableName: Joi.string().required(),
}).unknown(false);

export const GamesBetOutputSchema = Joi.object<GamesBetOutput>({ ok: Joi.boolean().required() }).unknown(false);
