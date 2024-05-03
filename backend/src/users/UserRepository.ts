import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { MySqLInstance as DB } from '../db/my-sql';
import { UsernameNotFoundError } from '../handlers/users/errors/gen/UsernameNotFoundError';
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
    const userId = userOrError.getValue()[0].user_id as number;

    return new ResultSuccess(userId);
  }

  static async getUserById(id: number): Promise<Result<User>> {
    const userRowOrError = await DB.select('users', ['user_id'], [id]);
    if (userRowOrError.isError()) {
      // TODO: should return User specific errors from here
      return new ResultError(userRowOrError.getError());
    }
    const userId = userRowOrError.getValue()[0].user_id as number;
    const username = userRowOrError.getValue()[0].username as string;

    const user = new User(userId, username);

    return new ResultSuccess(user);
  }

  static async getUserByUsername(username: string): Promise<Result<User>> {
    const userOrError = await DB.select('users', ['username'], [username]);
    if (userOrError.isError()) {
      return new ResultError(userOrError.getError());
    }
    const userId = userOrError.getValue()[0].user_id as number;
    const user = new User(userId, username);

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

    const password = userOrError.getValue()[0].password as string;

    return new ResultSuccess(password);
  }

  static async deleteUser(id: number): Promise<Result<void>> {
    const deleteOrError = await DB.delete('users', ['user_id'], [id]);
    if (deleteOrError.isError()) {
      return new ResultError(deleteOrError.getError());
    }
    return Result.success();
  }

  static async createUserSession(user_id: number, sessionId: string): Promise<Result<void>> {
    const res = await DB.insert('users_sessions', ['user_id', 'session_id'], [user_id, sessionId]);

    if (res.isError()) {
      return new ResultError(res.getError());
    }
    return Result.success();
  }

  static async deleteUserSession(user_id: number): Promise<Result<void>> {
    const res = await DB.delete('users_sessions', ['user_id'], [user_id]);
    if (res.isError()) {
      return new ResultError(res.getError());
    }
    return Result.success();
  }

  static async getSessionIdByUserId(user_id: number): Promise<Result<string>> {
    const userOrError = await DB.select('users_sessions', ['user_id'], [user_id]);

    if (userOrError.isError()) {
      return new ResultError(userOrError.getError());
    }

    if (userOrError.getValue().length === 0) {
      return new ResultError(new UsernameNotFoundError());
    }
    const sessionId = userOrError.getValue()[0].session_id;

    return new ResultSuccess(sessionId);
  }
}
