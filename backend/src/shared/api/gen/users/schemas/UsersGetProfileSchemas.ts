import Joi from 'joi';

import { UsersGetProfileOutput, UsersGetProfilePayload } from '../types/UsersGetProfile';

export const UsersGetProfilePayloadSchema = Joi.object<UsersGetProfilePayload>({}).unknown(false);

export const UsersGetProfileOutputSchema = Joi.object<UsersGetProfileOutput>({
  ok: Joi.boolean().required(),
  profile: Joi.object({ username: Joi.string().required() }).required(),
}).unknown(false);
