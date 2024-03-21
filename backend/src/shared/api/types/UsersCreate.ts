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

// TODO: api errors should be here
