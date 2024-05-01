import express from 'express';
import type { Request } from 'express';

import { ResultError, ResultSuccess } from '@infra/Result';
import { UsersSigninOutput, UsersSigninPayload } from '@shared/api/gen/users/types/UsersSignin';

import { UserRepository } from '../../../users/UserRepository';
import { UserService } from '../../../users/UserService';
import { Logger } from '../../../utils/Logger';
import { PasswordInvalidError } from '../errors/gen/PasswordInvalidError';
import { UsernameNotFoundError } from '../errors/gen/UsernameNotFoundError';
import { AbstractUsersSigninHandler } from './gen/AbstractUsersSigninHandler';

export const router = express.Router();

/**
 * SigninHandler signs in a user
 */
class UsersSigninHandler extends AbstractUsersSigninHandler {
  protected async getResult(
    payload: UsersSigninPayload,
    _user: string /* unused, used in other class methods */,
    req: Request<UsersSigninPayload>,
  ) {
    // TODO: need to validate username. task: 86cv07w0c
    // console.log(payload);
    const username = payload.username;
    const password = payload.password;
    const passwordOrError = await UserService.validatePassword(username, password);

    if (passwordOrError.isError()) {
      return new ResultError(passwordOrError.getError());
    }

    if (req.session.authenticated) {
      Logger.info('User already authenticated');
    } else {
      req.session.username = username;
      req.session.authenticated = true;

      const res = await UserRepository.createUserSession(req.session.id, username);
      if (res.isError()) {
        Logger.error(res.getError().code);
        return new ResultError(res.getError());
      }
    }

    return new ResultSuccess<UsersSigninOutput>({ ok: true });
  }
}

export { UsersSigninHandler };
