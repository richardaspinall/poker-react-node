export interface ApiMethodShape {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string;
  handlerName: string;
}

export const ApiMethods: { [key: string]: ApiMethodShape } = {
  signin: {
    httpMethod: 'post',
    path: 'signin',
    handler: '../../handlers/signin/SigninHandler.ts',
    handlerName: 'SigninHandler',
  },
  getSeats: {
    httpMethod: 'post',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/PokerTablesGetSeatsHandler.ts',
    handlerName: 'PokerTablesGetSeatsHandler',
  },
  tablesJoin: {
    httpMethod: 'post',
    path: 'poker-tables.join',
    handler: '../../handlers/poker-tables/PokerTablesJoinHandler.ts',
    handlerName: 'PokerTablesJoinHandler',
  },
  tablesLeave: {
    httpMethod: 'post',
    path: 'poker-tables.leave',
    handler: '../../handlers/poker-tables/PokerTablesLeaveHandler.ts',
    handlerName: 'PokerTablesLeaveHandler',
  },
  usersCreate: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/users/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
  },
} as const;
