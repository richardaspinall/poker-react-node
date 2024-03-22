// Types
import { BaseOutput } from './BaseOutput';

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

import { BaseError } from '@Infra/Result';

// TODO: change to extends from APIError for API errors
export class UsersCreateError extends BaseError {
  constructor() {
    super('user_create_error', 'User not created');
  }
}
export class UsersCreateNameTakenError extends BaseError {
  constructor() {
    super('name_taken', 'Username taken');
  }
}
