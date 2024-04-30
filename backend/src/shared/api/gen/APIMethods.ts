import { APIMethodShape } from '../APIMethodShape';

export const APIMethods: { [key: string]: APIMethodShape } = {
  divide: {
    httpMethod: 'post',
    path: 'math.divide',
    handler: '../../handlers/math/divide/MathDivideHandler.ts',
    handlerName: 'MathDivideHandler',
  },
  getSeats: {
    httpMethod: 'post',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/getSeats/PokerTablesGetSeatsHandler.ts',
    handlerName: 'PokerTablesGetSeatsHandler',
  },
  join: {
    httpMethod: 'post',
    path: 'poker-tables.join',
    handler: '../../handlers/poker-tables/join/PokerTablesJoinHandler.ts',
    handlerName: 'PokerTablesJoinHandler',
  },
  leave: {
    httpMethod: 'post',
    path: 'poker-tables.leave',
    handler: '../../handlers/poker-tables/leave/PokerTablesLeaveHandler.ts',
    handlerName: 'PokerTablesLeaveHandler',
  },
  create: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/users/create/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
  },
  signin: {
    httpMethod: 'post',
    path: 'users.signin',
    handler: '../../handlers/users/signin/UsersSigninHandler.ts',
    handlerName: 'UsersSigninHandler',
  },
} as const;
