import type { NextFunction, Request, Response } from 'express';

import type { BaseOutput } from './BaseOutput';
import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tables/types/PokerTableGetSeats';

export interface ApiHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>, next: NextFunction): any;
}

export interface ApiMethodMap {
  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
