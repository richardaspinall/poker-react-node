import { UsersSigninOutputSchema, UsersSigninPayloadSchema } from '@shared/api/users/schemas/UsersSigninSchemas';
import { UsersSigninErrorCodes, UsersSigninOutput, UsersSigninPayload } from '@shared/api/users/types/UsersSignin';

import { BaseHandler } from '../BaseHandler';

export abstract class AbstractUsersSigninHandler extends BaseHandler<UsersSigninPayload, UsersSigninOutput> {
  constructor() {
    super(UsersSigninPayloadSchema, UsersSigninOutputSchema, UsersSigninErrorCodes);
  }
}
