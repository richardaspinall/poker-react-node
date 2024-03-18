import { BaseError } from '@Infra/Result';

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

