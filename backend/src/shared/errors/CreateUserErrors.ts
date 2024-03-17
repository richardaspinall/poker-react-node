import { BaseError } from '@Infra/Result';

export class CreateUserError extends BaseError {
  constructor() {
    super('CREATE_USER_ERROR', 'User not created');
  }
}
export class CreateUserNameTakenError extends BaseError {
  constructor() {
    super('NAME_TAKEN', 'Username taken');
  }
}

