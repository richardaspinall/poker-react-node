import Joi from 'joi';

import { UsersCreateOutput, UsersCreatePayload } from '../types/UsersCreate';

export const UsersCreatePayloadSchema = Joi.object<UsersCreatePayload>({
  password: Joi.string().required(),
  username: Joi.string().required(),
}).unknown(false);

export const UsersCreateOutputSchema = Joi.object<UsersCreateOutput>({ ok: Joi.boolean().required() }).unknown(false);
