/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { UsersSigninPayload, } from '@shared/api/gen/users/types/UsersSignin';

import { AbstractUsersSigninHandler } from './gen/signinAbstractUsersSigninHandler';

import {UsernameNotFoundError} from './gen/signin/errors/UsernameNotFoundError'

import {PasswordInvalidError} from './gen/signin/errors/PasswordInvalidError'


export class UsersSigninHandler extends AbstractUsersSigninHandler {
  protected async getResult(payload: UsersSigninPayload) {
    return new ResultSuccess();
  }
}
*/
import { UsersSigninOutputSchema, UsersSigninPayloadSchema } from '@shared/api/gen/users/schemas/UsersSigninSchemas';
import { UsersSigninErrorCodes, UsersSigninOutput, UsersSigninPayload } from '@shared/api/gen/users/types/UsersSignin';

import { BaseHandler } from '../../BaseHandler';

export abstract class AbstractUsersSigninHandler extends BaseHandler<UsersSigninPayload, UsersSigninOutput> {
  constructor() {
    super(UsersSigninPayloadSchema, UsersSigninOutputSchema, UsersSigninErrorCodes);
  }
}
