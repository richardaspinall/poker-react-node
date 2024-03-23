import { Request, Response, NextFunction } from 'express';

import { pokerTablesJoinErrorHandler } from '../../handlers/poker-tables/PokerTablesJoinHandler';
import { pokerTablesLeaveErrorHandler } from '../../handlers/poker-tables/PokerTablesLeaveHandler';

import { IBaseError } from '@Infra/Result';

export interface ApiMethodShape {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string;
  handlerName: string;
  errorHandler?: (err: IBaseError, req: Request, res: Response, next: NextFunction) => void;
}

export const ApiMethods: { [key: string]: ApiMethodShape } = {
  // add entries for each API method
  tablesJoin: {
    httpMethod: 'post',
    path: 'tables.join',
    handler: '../../handlers/poker-tables/PokerTablesJoinHandler.ts',
    handlerName: 'PokerTablesJoinHandler',
    errorHandler: pokerTablesJoinErrorHandler,
  },
  tablesLeave: {
    httpMethod: 'post',
    path: 'tables.leave',
    handler: '../../handlers/poker-tables/PokerTablesLeaveHandler.ts',
    handlerName: 'PokerTablesLeaveHandler',
    errorHandler: pokerTablesLeaveErrorHandler,
  },
  usersCreate: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/users/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
  },
} as const;
