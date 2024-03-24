// Types
import type { Response } from 'express';
import {
  type UsersCreatePayload,
  type UsersCreateOutput,
  usersCreateSchema,
} from '../../shared/api/Users/types/UsersCreate';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result, IBaseError } from '@Infra/Result';
import { MethodNotImplementedError } from '@Shared/api/BaseOutput';
import { mapBaseErrorToAPIError } from '../helpers/mapBaseErrorToAPIError';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(usersCreateSchema);
  }

  protected getResult(payload: Result<UsersCreatePayload>, res: Response<UsersCreateOutput>) {
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    return res.send({ ok: false, error: new MethodNotImplementedError() });
    // Store new user in db here
    return res.send({ ok: true });
  }

  protected handleError(error: IBaseError, res: Response) {
    return res.send({
      ok: false,
      error: mapBaseErrorToAPIError(error),
    });

    throw error;
  }
}

export { UsersCreateHandler };
