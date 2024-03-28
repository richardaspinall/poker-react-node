import express from 'express';
import type { NextFunction, Request, Response } from 'express';

import { SigninErrorCodes } from '@shared/signin/types/Signin';
import { UserService } from '../../users/UserService';
import { ErrorHandler } from '../BaseHandler';

import { validatePayload } from '../validatePayload';
import { mapBaseErrorToAPIError } from '../helpers/mapBaseErrorToAPIError';

import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/signin/types/Signin';

export const router = express.Router();
/**
 * SigninHandler signs in a user
 */
class SigninHandler {
  public async getResult(req: Request<SigninPayload>, res: Response<SigninOutput>, next: NextFunction) {
    try {
      const payload = validatePayload<SigninPayload>(signinSchema, req.body);

      if (payload.isError()) {
        const error = payload.getError();
        const apiError = mapBaseErrorToAPIError(error);

        res.status(400).send({ ok: false, error: apiError });
        return;
      }

      const username = payload.getValue().username;
      const password = payload.getValue().password;
      const passwordIsValid = await UserService.validatePassword(username, password);

      if (passwordIsValid.isError()) {
        return ErrorHandler.handleError(passwordIsValid.getError(), SigninErrorCodes, res);
      }
      if (req.session.authenticated) {
        console.log('User already authenticated');
      } else {
        req.session.username = username;
        req.session.authenticated = true;
      }

      return res.send({ ok: true });
    } catch (error) {
      next(error); // Pass any caught errors to next() for error handling
    }
  }
}

export { SigninHandler };
