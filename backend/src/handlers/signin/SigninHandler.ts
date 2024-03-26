import type { Response } from 'express';

import { Result } from '@infra/Result';

import { SigninErrorCodes } from '@shared/api/signin/types/Signin';
import { BaseHandler } from '../BaseHandler';
import { UserService } from '../../users/UserService';

import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/api/signin/types/Signin';

/**
 * SigninHandler signs in a user
 */
class SigninHandler extends BaseHandler<SigninPayload, SigninOutput> {
  constructor() {
    super(signinSchema, SigninErrorCodes);
  }

  protected async getResult(payload: Result<SigninPayload>, res: Response<SigninOutput>) {
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    const passwordIsValid = await UserService.validatePassword(username, password);

    if (passwordIsValid.isError()) {
      return this.handleError(passwordIsValid.getError(), res);
    }

    return res.send({ ok: true });
  }
}

export { SigninHandler };
