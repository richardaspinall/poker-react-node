import { BaseError } from '@infra/BaseError';

import { SigninErrorCodes } from '../../../shared/signin/types/Signin';

export class UsernameNotFoundError extends BaseError {
  constructor() {
    super(SigninErrorCodes.UsernameNotFound, 'Username is not found');
  }
}
