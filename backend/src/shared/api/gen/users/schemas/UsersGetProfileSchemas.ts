import Joi from 'joi';

import { UsersGetProfileOutput, UsersGetProfilePayload } from '../types/UsersGetProfile';

export const UsersGetProfilePayloadSchema = Joi.object<UsersGetProfilePayload>({}).unknown(false);

export const UsersGetProfileOutputSchema = Joi.object<UsersGetProfileOutput>({
  ok: Joi.boolean().required(),
  username: Joi.string().required(),
}).unknown(false);
