import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersCreatePayload } from '@shared/api/gen/users/types/UsersCreate';

import { AbstractUsersCreateHandler } from './gen/AbstractUsersCreateHandler';
import { UsernameTakenError } from './gen/errors/UsernameTakenError';
import { UsersCreateError } from './gen/errors/UsersCreateError';

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
