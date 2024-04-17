import type { Request, Response } from 'express';

import { UsersCreateErrorCodes } from '@shared/api/users/types/UsersCreate';

import { UserRepository } from '../../users/UserRepository';
import { UserService } from '../../users/UserService';
import { UsersCreateOutput, UsersCreatePayload, usersCreateSchema } from '../../shared/api/users/types/UsersCreate';
import { BaseHandler } from '../BaseHandler';

/**
 * UsersCreateHandler is used to handle requests to create a new user for DB
 */
class UsersCreateHandler extends BaseHandler<UsersCreatePayload, UsersCreateOutput> {
  // We pass the Joi schema to the parent class (BaseHandler) which is used to validate incoming payloads in the runHandler (in the parent class)
  constructor() {
    super(usersCreateSchema, UsersCreateErrorCodes, false);
  }

  public async getResult(
    payload: UsersCreatePayload,
    res: Response<UsersCreateOutput>,
    req: Request<UsersCreatePayload>
  ) {
    const username = payload.username;
    const password = payload.password;
    const passwordOrError = await UserService.validatePassword(username, password);
    if (passwordOrError.isError()) {
      return this.handleError(passwordOrError.getError(), res);
    }
    const createUserOrError = await UserRepository.createUser({ username: username, password: password });
    if (createUserOrError.isError()) {
      return this.handleError(createUserOrError.getError(), res);
    }
    
    // req.session.username = username;
    // req.session.authenticated = true;
  
    return res.send({ ok: true });
  }
}

export { UsersCreateHandler };
