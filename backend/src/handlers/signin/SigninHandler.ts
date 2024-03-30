import express from 'express';
import type { NextFunction, Request, Response } from 'express';

import { SigninErrorCodes } from '@shared/signin/types/Signin';
import { UserService } from '../../users/UserService';
import { ErrorHandler } from '../ErrorHandler';

import { Logger } from '../../utils/Logger';
import { mapBaseErrorToAPIError } from '../helpers/mapBaseErrorToAPIError';
import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/signin/types/Signin';
import { validatePayload } from '../validatePayload';

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

      // TODO: need to validate username. task: 86cv07w0c
      const username = payload.getValue().username;
      const password = payload.getValue().password;
      const passwordOrError = await UserService.validatePassword(username, password);

      if (passwordOrError.isError()) {
        return ErrorHandler.handleError(passwordOrError.getError(), SigninErrorCodes, res);
      }

      if (req.session.authenticated) {
        Logger.info('User already authenticated');
      } else {
        req.session.username = username;
        req.session.authenticated = true;
      }

      return res.send({ ok: true });
    } catch (error) {
      next(error);
    }
  }
}

export { SigninHandler };
