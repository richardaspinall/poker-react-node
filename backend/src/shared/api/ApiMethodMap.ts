// Types
import type { Request, Response } from 'express';
import type { BaseOutput } from './types/BaseOutput';

// Handler types
import type { PokerTableJoinPayload, PokerTableJoinOutput } from './types/PokerTableJoin';
import type { PokerTableLeavePayload, PokerTableLeaveOutput } from './types/PokerTableLeave';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>): any;
}

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
}

export type ApiMethod = keyof ApiMethodMap;
