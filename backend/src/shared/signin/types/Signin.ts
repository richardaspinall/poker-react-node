import Joi from 'joi';

import { BaseOutput } from '../../api/BaseOutput';

export type SigninPayload = {
  username: string;
  password: string;
};

export interface SigninOutput extends BaseOutput {}

export const SigninPayloadSchema = Joi.object<SigninPayload>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export const SigninOutputSchema = Joi.object({
  ok: Joi.boolean().required(),
}).unknown(false);

export enum SigninErrorCodes {
  UsernameNotFound = 'username_not_found',
  PasswordInvalid = 'password_invalid',
}
