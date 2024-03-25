import FetchFacade from './FetchFacade';

import { ApiMethod, ApiMethodMap } from '../../../backend/src/shared/api/ApiMethodMap';

const apiCall = {
  async post<TMethod extends ApiMethod>(
    route: TMethod,
    payload: ApiMethodMap[TMethod]['request']
  ): Promise<ApiMethodMap[TMethod]['response']> {
    const result = await FetchFacade.post<ApiMethodMap[TMethod]['request'], ApiMethodMap[TMethod]['response']>(
      route,
      payload
    );
    if (result.isSuccess) {
      return result.getValue();
    } else {
      console.log(result.error);
      throw new Error(result.error);
    }
  },

  async get<TMethod extends ApiMethod>(route: TMethod) {
    return await FetchFacade.get<ApiMethodMap[TMethod]['response']>(route);
  },
};

export default apiCall;
