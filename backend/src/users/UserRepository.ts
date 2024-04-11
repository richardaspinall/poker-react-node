import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { MySqLInstance as DB } from '../db/my-sql';
import { UsernameNotFoundError } from '../handlers/signin/errors/UsernameNotFoundError';
import { User } from './User';

interface NewUserDTO {
  username: string;
  password: string;
}

/**
 * UserRepository is responsible for managing the user table in the database.
 */
export class UserRepository {
  static async createUser(userDTO: NewUserDTO): Promise<Result<number>> {
    const res = await DB.insert('users', ['username', 'password'], [userDTO.username, userDTO.password]);
    if (res.isError()) {
      return new ResultError(res.getError());
    }
    const userOrError = await DB.select('users', ['username'], [userDTO.username]);
    if (userOrError.isError()) {
      // TODO: should return User specific errors from here
      return new ResultError(userOrError.getError());
    }
    const userId: number = userOrError.getValue()[0].user_id;

    return new ResultSuccess(userId);
  }

  static async getUserById(id: number): Promise<Result<User>> {
    const userOrError = await DB.select('users', ['user_id'], [id]);
    if (userOrError.isError()) {
      // TODO: should return User specific errors from here
      return new ResultError(userOrError.getError());
    }
    const username = userOrError.getValue()[0].username;
    const userId = userOrError.getValue()[0].user_id;
    const user = new User(username, userId);

    return new ResultSuccess(user);
  }

  static async getPassword(username: string): Promise<Result<string>> {
    const userOrError = await DB.select('users', ['username'], [username]);
    if (userOrError.isError()) {
      return new ResultError(userOrError.getError());
    }

    if (userOrError.getValue().length === 0) {
      return new ResultError(new UsernameNotFoundError());
    }

    const password = userOrError.getValue()[0].password;

    return new ResultSuccess(password);
  }

  static async deleteUser(id: number): Promise<Result<void>> {
    const deleteOrError = await DB.delete('users', ['user_id'], [id]);
    if (deleteOrError.isError()) {
      return new ResultError(deleteOrError.getError());
    }
    return Result.success();
  }
}
