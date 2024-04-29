import { BaseError } from '@infra/BaseError';

export class PasswordInvalidError extends BaseError {
  constructor() {
    super('password_invalid', 'Password is invalid');
  }
}
