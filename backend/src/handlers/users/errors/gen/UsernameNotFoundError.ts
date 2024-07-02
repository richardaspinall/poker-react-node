import { BaseError } from '@infra/BaseError';

export class UsernameNotFoundError extends BaseError {
  constructor() {
    super('USERNAME_NOT_FOUND', 'Username was not found');
  }
}
