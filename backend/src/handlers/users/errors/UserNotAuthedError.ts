import { BaseError } from '@infra/BaseError';

export class UserNotAuthedError extends BaseError {
  constructor() {
    super('not_authed', 'User not authenticated');
  }
}
