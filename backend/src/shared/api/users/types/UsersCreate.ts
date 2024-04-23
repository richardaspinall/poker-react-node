import Joi from 'joi';

import { BaseOutput } from '../../BaseOutput';

export type UsersCreatePayload = {
  username: string;
  password: string;
};

export interface UsersCreateOutput extends BaseOutput {}

export const UsersCreatePayloadSchema = Joi.object<UsersCreatePayload>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const UsersCreateOutputSchema = Joi.object({
  ok: Joi.boolean().required(),
}).unknown(false);

export enum UsersCreateErrorCodes {
  UsernameTaken = 'username_taken',
  UsersCreateError = 'users_create_error',
}
