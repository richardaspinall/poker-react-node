import { BaseError } from '@Infra/Result';

export class UsersCreateError extends BaseError {
  constructor() {
    super('user_create_error', 'User not created');
  }
}
