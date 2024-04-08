// Types
import type { NextFunction, Request, Response } from 'express';
import type { BaseOutput } from './BaseOutput';

// Handler types
import type { SigninPayload, SigninOutput } from '@shared/signin/types/Signin';
import type { PokerTableJoinPayload, PokerTableJoinOutput } from './poker-tables/types/PokerTableJoin';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from './poker-tables/types/PokerTableLeave';
import type { UsersCreatePayload, UsersCreateOutput } from './users/types/UsersCreate';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>, next: NextFunction): any;
}

/**
 * ApiMethodMap is used to define the types for each API method
 */
export interface ApiMethodMap {
  // Add entries for each API method
  signin: {
    request: SigninPayload;
    response: SigninOutput;
  };
  'poker-tables.join': {
    request: PokerTableJoinPayload;
    response: PokerTableJoinOutput;
  };
  'poker-tables.leave': {
    request: PokerTableLeavePayload;
    response: PokerTableLeaveOutput;
  };
  'users.create': {
    request: UsersCreatePayload;
    response: UsersCreateOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
