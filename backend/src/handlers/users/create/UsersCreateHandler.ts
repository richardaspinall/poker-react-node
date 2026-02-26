import { ResultError, ResultSuccess } from '@infra/Result';
import { UsersCreateOutput, UsersCreatePayload } from '@shared/api/gen/users/types/UsersCreate';

import { UserRepository } from '../../../users/UserRepository';
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

    const createUserOrError = await UserRepository.createUser({ username, password });
    if (createUserOrError.isError()) {
      const error = createUserOrError.getError();
      if (error.code === 'DUPLICATE_ENTRY') {
        return new ResultError(new UsernameTakenError());
      }

      return new ResultError(new UsersCreateError());
    }

    return new ResultSuccess<UsersCreateOutput>({ ok: true });
  }
}

export { UsersCreateHandler };
