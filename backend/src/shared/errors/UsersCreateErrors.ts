import { BaseError } from '@Infra/Result';

// TODO: change to extends from APIError for API errors
export class UsersCreateError extends BaseError {
  constructor() {
    super('CREATE_USER_ERROR', 'User not created');
  }
}
export class UsersCreateNameTakenError extends BaseError {
  constructor() {
    super('NAME_TAKEN', 'Username taken');
  }
}
