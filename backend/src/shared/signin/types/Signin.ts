import Joi from 'joi';

import { BaseOutput } from '../../api/BaseOutput';

export type SigninPayload = {
  username: string;
  password: string;
};

export interface SigninOutput extends BaseOutput {}

// Joi schema
export const signinSchema = Joi.object<SigninPayload>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export enum SigninErrorCodes {
  UsernameNotFound = 'username_not_found',
  PasswordInvalid = 'password_invalid',
}
