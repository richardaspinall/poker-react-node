import { UsersCreateOutputSchema, UsersCreatePayloadSchema } from '@shared/api/users/schemas/UsersCreateSchemas';
import { UsersCreateErrorCodes, UsersCreateOutput, UsersCreatePayload } from '@shared/api/users/types/UsersCreate';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractUsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  constructor() {
    super(UsersCreatePayloadSchema, UsersCreateOutputSchema, UsersCreateErrorCodes);
  }
}
