import type { Response } from 'express';

import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersCreateErrorCodes } from '@shared/api/users/types/UsersCreate';

import {
  type UsersCreatePayload,
  type UsersCreateOutput,
  usersCreateSchema,
} from '../../shared/api/users/types/UsersCreate';
import { BaseHandler } from '../BaseHandler';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(usersCreateSchema, UsersCreateErrorCodes);
  }

  protected getResult(payload: UsersCreatePayload, res: Response<UsersCreateOutput>) {
    const username = payload.username;
    const password = payload.password;

    return this.handleError(new MethodNotImplementedError(), res);
  }
}

export { UsersCreateHandler };
