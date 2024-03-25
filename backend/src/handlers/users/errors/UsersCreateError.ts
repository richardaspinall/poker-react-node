import { BaseError } from '@infra/BaseError';

import { UsersCreateErrorCodes } from '../../../shared/api/users/types/UsersCreate';

export class UsersCreateError extends BaseError {
  constructor() {
    super(UsersCreateErrorCodes.UsersCreateError, 'User not created');
  }
}
