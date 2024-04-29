/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { UsersCreatePayload, } from '@shared/api/gen/users/types/UsersCreate';

import { AbstractUsersCreateHandler } from './gen/createAbstractUsersCreateHandler';

import {UsernameTakenError} from './gen/create/errors/UsernameTakenError'

import {UsersCreateError} from './gen/create/errors/UsersCreateError'


export class UsersCreateHandler extends AbstractUsersCreateHandler {
  protected async getResult(payload: UsersCreatePayload) {
    return new ResultSuccess();
  }
}
*/
import { UsersCreateOutputSchema, UsersCreatePayloadSchema } from '@shared/api/gen/users/schemas/UsersCreateSchemas';
import { UsersCreateErrorCodes, UsersCreateOutput, UsersCreatePayload } from '@shared/api/gen/users/types/UsersCreate';

import { BaseHandler } from '../../BaseHandler';

export abstract class AbstractUsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  constructor() {
    super(UsersCreatePayloadSchema, UsersCreateOutputSchema, UsersCreateErrorCodes);
  }
}
