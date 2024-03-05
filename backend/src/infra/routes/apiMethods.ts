export interface ApiMethodShape {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string;
  handlerName: string;
}
export const ApiMethods: { [key: string]: ApiMethodShape } = {
  // add entries for each API method
  tablesJoin: {
    httpMethod: 'post',
    path: 'tables.join',
    handler: '../../handlers/actions/PokerTableJoinHandler.ts',
    handlerName: 'PokerTableJoinHandler',
  },
  tablesLeave: {
    httpMethod: 'post',
    path: 'tables.leave',
    handler: '../../handlers/actions/PokerTableLeaveHandler.ts',
    handlerName: 'PokerTableLeaveHandler',
  },
} as const;
