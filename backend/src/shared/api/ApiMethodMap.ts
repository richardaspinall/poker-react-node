// Types
import type { NextFunction, Request, Response } from 'express';
import type { BaseOutput } from './BaseOutput';

// Handler types
import type { PokerTableJoinPayload, PokerTableJoinOutput } from './PokerTables/types/PokerTableJoin';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from './PokerTables/types/PokerTableLeave';
import type { UsersCreatePayload, UsersCreateOutput } from './Users/types/UsersCreate';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>, next: NextFunction): any;
}

/**
 * ApiMethodMap is used to define the types for each API method
 */
export interface ApiMethodMap {
  // Add entries for each API method
  'tables.join': {
    request: PokerTableJoinPayload;
    response: PokerTableJoinOutput;
  };
  'tables.leave': {
    request: PokerTableLeavePayload;
    response: PokerTableLeaveOutput;
  };
  'users.create': {
    request: UsersCreatePayload;
    response: UsersCreateOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
