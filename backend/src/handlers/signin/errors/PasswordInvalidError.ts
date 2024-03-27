import { BaseError } from '@infra/BaseError';
import { SigninErrorCodes } from '../../../shared/signin/types/Signin';

export class PasswordInvalidError extends BaseError {
  constructor() {
    super(SigninErrorCodes.PasswordInvalid, 'Password is incorrect');
  }
}
