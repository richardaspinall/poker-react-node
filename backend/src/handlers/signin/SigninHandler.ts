import express from 'express';
import type { Request } from 'express';

import { ResultError, ResultSuccess } from '@infra/Result';
import { SigninErrorCodes } from '@shared/signin/types/Signin';

import { SigninOutput, SigninOutputSchema, SigninPayload, SigninPayloadSchema } from '../../shared/signin/types/Signin';
import { UserService } from '../../users/UserService';
import { Logger } from '../../utils/Logger';
import { BaseHandler } from '../BaseHandler';

export const router = express.Router();

/**
 * SigninHandler signs in a user
 */
class SigninHandler extends BaseHandler<SigninPayload, SigninOutput> {
  constructor() {
    super(SigninPayloadSchema, SigninOutputSchema, SigninErrorCodes, false);
  }

  //
  protected async getResult(
    payload: SigninPayload,
    _user: string /* unused, used in other class methods */,
    req: Request<SigninPayload>,
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
    }

    return new ResultSuccess<SigninOutput>({ ok: true });
  }
}

export { SigninHandler };
