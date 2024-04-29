import { BaseError } from '@infra/BaseError';

export class UsernameNotFoundError extends BaseError {
  constructor() {
    super('username_not_found', 'Username not found');
  }
}
