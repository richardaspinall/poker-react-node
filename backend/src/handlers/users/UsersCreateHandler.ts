// Types
import type { Response } from 'express';
import {
  type UsersCreatePayload,
  type UsersCreateOutput,
  usersCreateSchema,
} from '../../shared/api/Users/types/UsersCreate';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result } from '@Infra/Result';
import { MethodNotImplementedError } from '@Shared/api/BaseOutput';
import { PokerTableErrorCodes } from '@Shared/api/PokerTables/types/PokerTableJoin';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(usersCreateSchema, PokerTableErrorCodes);
  }

  protected getResult(payload: Result<UsersCreatePayload>, res: Response<UsersCreateOutput>) {
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    return this.handleError(new MethodNotImplementedError(), res);
    // Store new user in db here
    return res.send({ ok: true });
  }
}

export { UsersCreateHandler };
