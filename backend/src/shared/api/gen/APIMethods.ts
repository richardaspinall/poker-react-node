import { APIMethodShape } from '../APIMethodShape';

export const APIMethods: { [key: string]: APIMethodShape } = {
  getSeats: {
    httpMethod: 'post',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/PokerTablesGetSeatsHandler.ts',
    handlerName: 'PokerTablesGetSeatsHandler',
  },
  join: {
    httpMethod: 'post',
    path: 'poker-tables.join',
    handler: '../../handlers/poker-tables/PokerTablesJoinHandler.ts',
    handlerName: 'PokerTablesJoinHandler',
  },
  leave: {
    httpMethod: 'post',
    path: 'poker-tables.leave',
    handler: '../../handlers/poker-tables/PokerTablesLeaveHandler.ts',
    handlerName: 'PokerTablesLeaveHandler',
  },
  create: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/users/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
  },
  signin: {
    httpMethod: 'post',
    path: 'users.signin',
    handler: '../../handlers/users/UsersSigninHandler.ts',
    handlerName: 'UsersSigninHandler',
  },
} as const;
