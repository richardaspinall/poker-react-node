// Internal
import { Result, ResultError, ResultSuccess } from '@shared/Result';
import { MySqLInstance as DB } from '../db/MySql';
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
    if (res.error) {
      return new ResultError(res.error);
    }
    const userOrError = await DB.select('users', ['username'], [userDTO.username]);
    if (userOrError.error) {
      // TODO: should return User specific errors from here
      return new ResultError(userOrError.error);
    }
    const userId: number = userOrError.getValue()[0].user_id;

    return new ResultSuccess(userId);
  }

  static async getUserById(id: number): Promise<Result<User>> {
    const userOrError = await DB.select('users', ['user_id'], [id]);
    if (userOrError.error) {
      // TODO: should return User specific errors from here
      return new ResultError(userOrError.error);
    }
    const username = userOrError.getValue()[0].username;
    const userId = userOrError.getValue()[0].user_id;
    const user = new User(username, userId);

    return new ResultSuccess(user);
  }

  static async deleteUser(id: number): Promise<Result<void>> {
    const deleteOrError = await DB.delete('users', ['user_id'], [id]);
    if (deleteOrError.error) {
      return new ResultError(deleteOrError.error);
    }
    return Result.success();
  }
}
