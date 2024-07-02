import { BaseError } from '@infra/BaseError';

export class UsernameTakenError extends BaseError {
  constructor() {
    super('USERNAME_TAKEN', 'Username is already taken');
  }
}
