// Types
import { BaseOutput } from '../../BaseOutput';

// External
import Joi from 'joi';

export type UsersCreatePayload = {
  username: string;
  password: string;
};

export interface UsersCreateOutput extends BaseOutput {}

// Joi schema
export const usersCreateSchema = Joi.object<UsersCreatePayload>({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

export enum UsersCreateErrorCodes {
  UsernameTaken = 'username_taken',
  UsersCreateError = 'users_create_error',
}
