import { BaseError } from '@infra/BaseError';

export class PasswordInvalidError extends BaseError {
  constructor() {
    super('PASSWORD_INVALID', 'Password is invalid');
  }
}
