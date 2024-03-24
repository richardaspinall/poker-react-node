import { BaseError } from '@Infra/Result';

import { UsersCreateErrorCodes } from '../types/UsersCreate';

export class UsersCreateError extends BaseError {
  constructor() {
    super(UsersCreateErrorCodes.UsersCreateError, 'User not created');
  }
}
