// Types
import type { Request, Response } from 'express';
import type { BaseOutput } from './types/BaseOutput';

// Handler types
import type { PokerTableJoinPayload, PokerTableJoinOutput } from './types/PokerTableJoin';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from './types/PokerTableLeave';
import type { UsersCreatePayload, UsersCreateOutput } from './types/UsersCreate';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>): any;
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
