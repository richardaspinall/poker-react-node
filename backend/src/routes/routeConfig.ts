// Define the route configuration interface
interface RouteConfig {
  httpMethod: 'get' | 'post' | 'put' | 'delete' | 'patch';
  path: string;
  handler: string; // Path to the router or handler file
  handlerClass: string // Name of the class Handler function
}

// Define the route configurations
const routes: RouteConfig[] = [
  {
    httpMethod: 'post',
    path: '/actions/tables.join',
    handler: '../handlers/actions/TablesJoinHandler.ts',
  },
  // Add more routes here
];

export default routes;
