// Types
import type { Response } from 'express';
import { type CreateUserPayload, type CreateUserOutput, createUserSchema } from '../../shared/api/types/CreateUser';

// Internal
import { BaseHandler } from '../BaseHandler';
import { Result } from '@Infra/Result';
import { CreateUserError } from '../../shared/errors/CreateUserErrors';

/**
 * CreateUserHandler is used to handle requests to create a new user for DB
 */
class CreateUserHandler extends BaseHandler<CreateUserPayload, CreateUserOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(createUserSchema);
  }

  protected getResult(payload: Result<CreateUserPayload>, res: Response<CreateUserOutput>) {
    const username = payload.getValue().username;
    const password = payload.getValue().password;

    // Store new user in db here
    
    // empty check error for now
    if (!username || !password) {
      return res.send({
        ok: false,
        error: new CreateUserError(),
      });
    }
    return res.send({ ok: true });
  }
}

export { CreateUserHandler };
