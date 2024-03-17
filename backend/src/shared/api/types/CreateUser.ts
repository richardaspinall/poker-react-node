// Types
import { BaseOutput } from './BaseOutput';

// External
import Joi from 'joi';

export type CreateUserPayload = {
  username: string;
  password: string;
};

export interface CreateUserOutput extends BaseOutput {}

// Joi schema
export const createUserSchema = Joi.object<CreateUserPayload>({
    username: Joi.string().required(),
    password: Joi.string().required(),
});