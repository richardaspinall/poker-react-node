import { BaseError } from '@infra/BaseError';

export class UsersCreateError extends BaseError {
  constructor() {
    super('USERS_CREATE_ERROR', 'User was not created');
  }
}
