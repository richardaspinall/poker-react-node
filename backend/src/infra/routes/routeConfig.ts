import { APIMethodShape } from '../../shared/api/APIMethodShape';
import { APIMethods } from '../../shared/api/APIMethods';

export const routes: APIMethodShape[] = Object.keys(APIMethods).map((key) => {
  const apiMethod = APIMethods[key as keyof typeof APIMethods];
  return {
    httpMethod: apiMethod.httpMethod,
    path: `/actions/${apiMethod.path}`,
    handler: apiMethod.handler,
    handlerName: apiMethod.handlerName,
  };
});
