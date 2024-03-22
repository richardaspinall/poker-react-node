import { BaseError } from '@Infra/Result';

export class UserNameTakenError extends BaseError {
  constructor() {
    super('username_taken', 'Username taken');
  }
}
