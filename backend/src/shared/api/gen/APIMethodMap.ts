import type { NextFunction, Request, Response } from 'express';

import type { BaseOutput } from '../BaseOutput';
import type { GamesGetGameStateOutput, GamesGetGameStatePayload } from './games/types/GamesGetGameState';
import type { PokerTablesGetSeatsOutput, PokerTablesGetSeatsPayload } from './poker-tables/types/PokerTablesGetSeats';
import type { PokerTablesJoinOutput, PokerTablesJoinPayload } from './poker-tables/types/PokerTablesJoin';
import type { PokerTablesLeaveOutput, PokerTablesLeavePayload } from './poker-tables/types/PokerTablesLeave';
import type { UsersCreateOutput, UsersCreatePayload } from './users/types/UsersCreate';
import type { UsersGetProfileOutput, UsersGetProfilePayload } from './users/types/UsersGetProfile';
import type { UsersSigninOutput, UsersSigninPayload } from './users/types/UsersSignin';

export interface APIHandler {
  runHandler(req: Request<any>, res: Response<BaseOutput>, next: NextFunction): any;
}

export interface APIMethodMap {
  'games.getGameState': {
    request: GamesGetGameStatePayload;
    response: GamesGetGameStateOutput;
  };
  'poker-tables.getSeats': {
    request: PokerTablesGetSeatsPayload;
    response: PokerTablesGetSeatsOutput;
  };
  'poker-tables.join': {
    request: PokerTablesJoinPayload;
    response: PokerTablesJoinOutput;
  };
  'poker-tables.leave': {
    request: PokerTablesLeavePayload;
    response: PokerTablesLeaveOutput;
  };
  'users.create': {
    request: UsersCreatePayload;
    response: UsersCreateOutput;
  };
  'users.getProfile': {
    request: UsersGetProfilePayload;
    response: UsersGetProfileOutput;
  };
  'users.signin': {
    request: UsersSigninPayload;
    response: UsersSigninOutput;
  };
}

export type APIMethod = keyof APIMethodMap;
