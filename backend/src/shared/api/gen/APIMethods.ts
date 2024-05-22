import { APIMethodShape } from '../APIMethodShape';

export const APIMethods: { [key: string]: APIMethodShape } = {
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
  getProfile: {
    httpMethod: 'post',
    path: 'users.getProfile',
    handler: '../../handlers/users/getProfile/UsersGetProfileHandler.ts',
    handlerName: 'UsersGetProfileHandler',
  },
  signin: {
    httpMethod: 'post',
    path: 'users.signin',
    handler: '../../handlers/users/signin/UsersSigninHandler.ts',
    handlerName: 'UsersSigninHandler',
  },
} as const;
