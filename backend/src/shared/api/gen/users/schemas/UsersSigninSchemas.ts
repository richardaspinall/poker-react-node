import Joi from 'joi';

import { UsersSigninOutput, UsersSigninPayload } from '../types/UsersSignin';

export const UsersSigninPayloadSchema = Joi.object<UsersSigninPayload>({
  password: Joi.string().required(),
  username: Joi.string().required(),
}).unknown(false);

export const UsersSigninOutputSchema = Joi.object<UsersSigninOutput>({ ok: Joi.boolean().required() }).unknown(false);
