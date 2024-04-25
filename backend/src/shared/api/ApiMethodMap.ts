import type { NextFunction, Request, Response } from 'express';

import type { SigninOutput, SigninPayload } from '@shared/signin/types/Signin';

import type { BaseOutput } from './BaseOutput';
import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tables/types/PokerTableGetSeats';
import type { PokerTableJoinOutput, PokerTableJoinPayload } from './poker-tables/types/PokerTableJoin';
import type { PokerTableLeaveOutput, PokerTableLeavePayload } from './poker-tables/types/PokerTableLeave';
import type { UsersCreateOutput, UsersCreatePayload } from './users/types/UsersCreate';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>, next: NextFunction): any;
}

/**
 * ApiMethodMap is used to define the types for each API method
 */
export interface ApiMethodMap {
  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };
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
