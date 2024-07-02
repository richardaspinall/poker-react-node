/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { MethodNotImplementedError } from '@shared/api/BaseOutput';
import { UsersCreatePayload, UsersCreateOutput } from '@shared/api/gen/users/types/UsersCreate';


import { UsernameTakenError } from '../errors/gen/UsernameTakenError';
import { UsersCreateError } from '../errors/gen/UsersCreateError';
import { AbstractUsersCreateHandler } from './gen/AbstractUsersCreateHandler';

export class UsersCreateHandler extends AbstractUsersCreateHandler {
  protected async getResult(payload: UsersCreatePayload) {
    return new ResultError(new MethodNotImplementedError());

    // 1. After generating the handler, create a PR returning the above
    // 2. Then implement the handler when the above PR is merged and use the below
    // return new ResultSuccess<UsersCreateOutput>();
  }
}
*/
import { UsersCreateOutputSchema, UsersCreatePayloadSchema } from '@shared/api/gen/users/schemas/UsersCreateSchemas';
import { UsersCreateErrorCodes, UsersCreateOutput, UsersCreatePayload } from '@shared/api/gen/users/types/UsersCreate';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractUsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  constructor() {
    super(UsersCreatePayloadSchema, UsersCreateOutputSchema, UsersCreateErrorCodes, false);
  }
}
