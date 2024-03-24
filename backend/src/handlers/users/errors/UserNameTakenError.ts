import { BaseError } from '@infra/BaseError';

import { UsersCreateErrorCodes } from '../../../shared/api/users/types/UsersCreate';

export class UserNameTakenError extends BaseError {
  constructor() {
    super(UsersCreateErrorCodes.UsernameTaken, 'Username taken');
  }
}
