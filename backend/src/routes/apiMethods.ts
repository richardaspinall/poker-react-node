export interface APIMethodShape {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string;
  handlerName: string;
}
export const APIMethods: { [key: string]: APIMethodShape } = {
  // add entries for each API method
  tablesJoin: {
    httpMethod: 'post',
    path: 'tables.join',
    handler: '../handlers/actions/PokerTableJoinHandler.ts',
    handlerName: 'PokerTableJoinHandler',
  },
  tablesLeave: {
    httpMethod: 'post',
    path: 'tables.leave',
    handler: '../handlers/actions/PokerTableLeaveHandler.ts',
    handlerName: 'PokerTableLeaveHandler',
  },
} as const;
