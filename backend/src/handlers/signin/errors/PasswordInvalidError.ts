import { BaseError } from '@infra/BaseError';
import { SigninErrorCodes } from '../../../shared/api/signin/types/Signin';

export class PasswordInvalidError extends BaseError {
  constructor() {
    super(SigninErrorCodes.PasswordInvalid, 'Password is incorrect');
  }
}
