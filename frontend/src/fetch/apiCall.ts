import FetchFacade from './FetchFacade';

import { ApiMethod, ApiMethodMap } from '../../../backend/src/shared/api/ApiMethodMap';

const apiCall = {
  async post<TMethod extends ApiMethod>(route: TMethod, payload: ApiMethodMap[TMethod]['request']) {
    const result = await FetchFacade.post<ApiMethodMap[TMethod]['request'], ApiMethodMap[TMethod]['response']>(
      route,
      payload
    );
    if (result.ok) {
      return result.getValue();
    } else {
      console.log(result.errorMessage);
      throw new Error(result.errorMessage);
    }
  },

  async get<TMethod extends ApiMethod>(route: TMethod) {
    return await FetchFacade.get<ApiMethodMap[TMethod]['response']>(route);
  },
};

export default apiCall;
