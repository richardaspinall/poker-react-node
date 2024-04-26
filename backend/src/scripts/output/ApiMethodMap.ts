import type { NextFunction, Request, Response } from 'express';
import type { BaseOutput } from './BaseOutput';

import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tables/types/PokerTableGetSeats';

import type {
  PokerTableGetSeatsNewOutput,
  PokerTableGetSeatsNewPayload,
} from './poker-tables/types/PokerTableGetSeatsNew';

export interface ApiMethodMap {
  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };

  'poker-tables.getSeatsNew': {
    request: PokerTableGetSeatsNewPayload;
    response: PokerTableGetSeatsNewOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
