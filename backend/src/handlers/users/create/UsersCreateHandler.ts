import { ResultError } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersCreateErrorCodes } from '@shared/api/users/types/UsersCreate';

import {
  UsersCreateOutput,
  UsersCreateOutputSchema,
  UsersCreatePayload,
  UsersCreatePayloadSchema,
} from '../../../shared/api/users/types/UsersCreate';
import { BaseHandler } from '../../BaseHandler';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(UsersCreatePayloadSchema, UsersCreateOutputSchema, UsersCreateErrorCodes, false);
  }

  protected async getResult(payload: UsersCreatePayload) {
    const username = payload.username;
    const password = payload.password;

    return new ResultError(new MethodNotImplementedError());
  }
}

export { UsersCreateHandler };
