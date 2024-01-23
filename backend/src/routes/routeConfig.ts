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
    handler: '../handlers/actions/TablesLeaveHandler.ts'
  }
];

export default routes;
