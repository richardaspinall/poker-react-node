// Internal
import { APIMethodShape, APIMethods } from './APIMethods';

export const routes: APIMethodShape[] = Object.keys(APIMethods).map((key) => {
  const APIMethod = APIMethods[key as keyof typeof APIMethods];
  return {
    httpMethod: APIMethod.httpMethod,
    path: `/actions/${APIMethod.path}`,
    handler: APIMethod.handler,
    handlerName: APIMethod.handlerName,
  };
});
