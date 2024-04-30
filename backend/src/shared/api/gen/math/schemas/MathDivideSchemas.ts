import Joi from 'joi';

import { MathDivideOutput, MathDividePayload } from '../types/MathDivide';

export const MathDividePayloadSchema = Joi.object<MathDividePayload>({
  a: Joi.number().required(),
  b: Joi.number().required(),
}).unknown(false);

export const MathDivideOutputSchema = Joi.object<MathDivideOutput>({
  ok: Joi.boolean().required(),
  result: Joi.number().required(),
}).unknown(false);
