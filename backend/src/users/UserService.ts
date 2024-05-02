import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { PasswordInvalidError } from '../handlers/users/errors/gen/PasswordInvalidError';
import { User } from './User';
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

  static async getUserId(username: string): Promise<Result<number>> {
    const userOrError = await UserRepository.getUserByUsername(username);
    if (userOrError.isError()) {
      return new ResultError(userOrError.getError());
    }

    const user = userOrError.getValue();

    return new ResultSuccess(user.getUserId());
  }

  static async getUserById(userId: number): Promise<Result<User>> {
    const userOrError = await UserRepository.getUserById(userId);

    if (userOrError.isError()) {
      return new ResultError(userOrError.getError());
    }

    return new ResultSuccess(userOrError.getValue());
  }
}
