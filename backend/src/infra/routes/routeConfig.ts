import { ApiMethods } from '../../shared/api/ApiMethods';
import { APIMethodShape } from '../../shared/api/APIMethodShape';

export const routes: APIMethodShape[] = Object.keys(ApiMethods).map((key) => {
  const apiMethod = ApiMethods[key as keyof typeof ApiMethods];
  return {
    httpMethod: apiMethod.httpMethod,
    path: `/actions/${apiMethod.path}`,
    handler: apiMethod.handler,
    handlerName: apiMethod.handlerName,
  };
});
