// Define the route configuration interface
interface RouteConfig {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string; // Path to the router or handler file
}

// Define the route configurations
const routes: RouteConfig[] = [
  {
    httpMethod: 'post',
    path: '/actions/tables.join',
    handler: '../handlers/actions/TablesJoinHandler.ts',
  },
  {
    httpMethod: 'post',
    path: '/actions/tables.leave',
    handler: '../handlers/actions/TablesLeaveHandler.ts',
  },
];
import { ApiMethodShape, ApiMethods } from './apiMethods';

const routes: ApiMethodShape[] = Object.keys(ApiMethods).map((key) => {
  const apiMethod = ApiMethods[key as keyof typeof ApiMethods];
  return {
    httpMethod: apiMethod.httpMethod,
    path: `/actions/${apiMethod.path}`,
    handler: apiMethod.handler,
  };
});

export default routes;
