import { PokerTableJoinPayload, PokerTableJoinOutput } from './types/PokerTableJoin';
import { PokerTableLeavePayload, PokerTableLeaveOutput } from './types/PokerTableLeave';

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
