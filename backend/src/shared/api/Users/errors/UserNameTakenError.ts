import { BaseError } from '@Infra/Result';

import { UsersCreateErrorCodes } from '../types/UsersCreate';

export class UserNameTakenError extends BaseError {
  constructor() {
    super(UsersCreateErrorCodes.UsernameTaken, 'Username taken');
  }
}
