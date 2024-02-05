export interface ApiMethodShape {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string;
}
export const ApiMethods: { [key: string]: ApiMethodShape } = {
  // add entries for each API method
  tablesJoin: { httpMethod: 'post', path: 'tables.join', handler: '../handlers/actions/TablesJoinHandler.ts' },
  tablesLeave: { httpMethod: 'post', path: 'tables.leave', handler: '../handlers/actions/TablesLeaveHandler.ts' },
} as const;