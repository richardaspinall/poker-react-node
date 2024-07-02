/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersSigninPayload, UsersSigninOutput } from '@shared/api/gen/users/types/UsersSignin';


import { UsernameNotFoundError } from '../errors/gen/UsernameNotFoundError';
import { PasswordInvalidError } from '../errors/gen/PasswordInvalidError';
import { AbstractUsersSigninHandler } from './gen/AbstractUsersSigninHandler';

export class UsersSigninHandler extends AbstractUsersSigninHandler {
  protected async getResult(payload: UsersSigninPayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<UsersSigninOutput>();
  }
}
*/
import { UsersSigninOutputSchema, UsersSigninPayloadSchema } from '@shared/api/gen/users/schemas/UsersSigninSchemas';
import { UsersSigninErrorCodes, UsersSigninOutput, UsersSigninPayload } from '@shared/api/gen/users/types/UsersSignin';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractUsersSigninHandler extends BaseHandler<UsersSigninPayload, UsersSigninOutput> {
  constructor() {
    super(UsersSigninPayloadSchema, UsersSigninOutputSchema, UsersSigninErrorCodes, false);
  }
}
