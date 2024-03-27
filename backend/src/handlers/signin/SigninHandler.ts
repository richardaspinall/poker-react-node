import express from 'express';
import type { Request, Response } from 'express';

import { Result } from '@infra/Result';

import { SigninErrorCodes } from '@shared/signin/types/Signin';
import { UserService } from '../../users/UserService';
import { UserSessionStore } from '../../users/UserSessionStore';
import { ErrorHandler } from '../BaseHandler';

import { validatePayload } from '../validatePayload';

import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/signin/types/Signin';

export const router = express.Router();
/**
 * SigninHandler signs in a user
 */
class SigninHandler {
  public async getResult(req: Request<SigninPayload>, res: Response<SigninOutput>) {
    const payload = validatePayload<SigninPayload>(signinSchema, req.body);
    console.log(req.session);
    console.log(req.session.id);
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    const passwordIsValid = await UserService.validatePassword(username, password);

    if (passwordIsValid.isError()) {
      return ErrorHandler.handleError(passwordIsValid.getError(), SigninErrorCodes, res);
    }

    UserSessionStore.addUserSession(req.session.id, username);

    req.session.username = username;
    req.session.authenticated = true;
    req.session.save();
    console.log(req.session);

    return res.send({ ok: true });
  }
}

export { SigninHandler };
