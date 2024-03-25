import type { Response } from 'express';

import { Result } from '@infra/Result';

import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { SigninErrorCodes } from '@shared/api/signin/types/Signin';
import { BaseHandler } from '../BaseHandler';

import { type SigninPayload, type SigninOutput, signinSchema } from '../../shared/api/signin/types/Signin';

/**
 * SigninHandler signs in a user
 */
class SigninHandler extends BaseHandler<SigninPayload, SigninOutput> {
  constructor() {
    super(signinSchema, SigninErrorCodes);
  }

  protected getResult(payload: Result<SigninPayload>, res: Response<SigninOutput>) {
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    return this.handleError(new MethodNotImplementedError(), res);
  }
}

export { SigninHandler };
