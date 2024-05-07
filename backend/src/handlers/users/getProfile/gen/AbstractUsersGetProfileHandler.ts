/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { UsersGetProfilePayload, UsersGetProfileOutput } from '@shared/api/gen/users/types/UsersGetProfile';

import { AbstractUsersGetProfileHandler } from './gen/AbstractUsersGetProfileHandler';


export class UsersGetProfileHandler extends AbstractUsersGetProfileHandler {
  protected async getResult(payload: UsersGetProfilePayload) {
    return new ResultSuccess<UsersGetProfileOutput>();
  }
}
*/
import {
  UsersGetProfileOutputSchema,
  UsersGetProfilePayloadSchema,
} from '@shared/api/gen/users/schemas/UsersGetProfileSchemas';
import {
  UsersGetProfileErrorCodes,
  UsersGetProfileOutput,
  UsersGetProfilePayload,
} from '@shared/api/gen/users/types/UsersGetProfile';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractUsersGetProfileHandler extends BaseHandler<
  UsersGetProfilePayload,
  UsersGetProfileOutput
> {
  constructor() {
    super(UsersGetProfilePayloadSchema, UsersGetProfileOutputSchema, UsersGetProfileErrorCodes);
  }
}
