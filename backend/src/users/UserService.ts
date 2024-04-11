import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { PasswordInvalidError } from '../handlers/signin/errors/PasswordInvalidError';
import { UserRepository } from './UserRepository';

// This file contains the UserService class which is responsible for managing users.
export class UserService {
  // TODO: passwords should be hashed
  static async validatePassword(username: string, password: string): Promise<Result<boolean>> {
    const passwordOrError = await UserRepository.getPassword(username);
    if (passwordOrError.isError()) {
      return new ResultError(passwordOrError.getError());
    }

    if (passwordOrError.getValue() === password) {
      return new ResultSuccess(true);
    }

    return new ResultError(new PasswordInvalidError());
  }
}
