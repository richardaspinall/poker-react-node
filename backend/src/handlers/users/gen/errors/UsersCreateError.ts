import { BaseError } from '@infra/BaseError';

export class UsersCreateError extends BaseError {
  constructor() {
    super('users_create_error', 'User not created');
  }
}
