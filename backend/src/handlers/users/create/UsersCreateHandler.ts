import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersCreatePayload } from '@shared/api/gen/users/types/UsersCreate';

import { UsernameTakenError } from '../errors/gen/UsernameTakenError';
import { UsersCreateError } from '../errors/gen/UsersCreateError';
import { AbstractUsersCreateHandler } from './gen/AbstractUsersCreateHandler';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends AbstractUsersCreateHandler {
  protected async getResult(payload: UsersCreatePayload) {
    const username = payload.username;
    const password = payload.password;

    return new ResultError(new MethodNotImplementedError());
  }
}

export { UsersCreateHandler };
