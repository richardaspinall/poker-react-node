import { BaseError } from '@infra/BaseError';

export class UsernameTakenError extends BaseError {
  constructor() {
    super('username_taken', 'Username already taken');
  }
}
