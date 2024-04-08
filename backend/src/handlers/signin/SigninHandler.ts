import express from 'express';
import type { Request, Response } from 'express';

import { Result } from '@infra/Result';
import { SigninErrorCodes } from '@shared/signin/types/Signin';

import { Logger } from '../../utils/Logger';
import { UserService } from '../../users/UserService';
import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/signin/types/Signin';
import { BaseHandler } from '../BaseHandler';

export const router = express.Router();

/**
 * SigninHandler signs in a user
 */
class SigninHandler extends BaseHandler<SigninPayload, SigninOutput> {
  constructor() {
    super(signinSchema, SigninErrorCodes, false);
  }

  public async getResult(payload: SigninPayload, res: Response<SigninOutput>, req: Request<SigninPayload>) {
    // TODO: need to validate username. task: 86cv07w0c
    // console.log(payload);
    const username = payload.username;
    const password = payload.password;
    const passwordOrError = await UserService.validatePassword(username, password);

    if (passwordOrError.isError()) {
      return this.handleError(passwordOrError.getError(), res);
    }

    if (req.session.authenticated) {
      Logger.info('User already authenticated');
    } else {
      req.session.username = username;
      req.session.authenticated = true;
    }

    return res.send({ ok: true });
  }
}

export { SigninHandler };
