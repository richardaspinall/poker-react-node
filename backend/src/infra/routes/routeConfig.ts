import { ApiMethodShape, ApiMethods } from '../../shared/api/ApiMethods';

export const routes: ApiMethodShape[] = Object.keys(ApiMethods).map((key) => {
  const apiMethod = ApiMethods[key as keyof typeof ApiMethods];
  return {
    httpMethod: apiMethod.httpMethod,
    path: `/actions/${apiMethod.path}`,
    handler: apiMethod.handler,
    handlerName: apiMethod.handlerName,
  };
});
