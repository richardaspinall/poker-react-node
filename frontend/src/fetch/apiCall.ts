import FetchFacade from './FetchFacade';

import { ApiMethodArgsMap, ApiMethod } from '../../../backend/src/shared/ApiMethodArgsMap';
import { ApiMethodOutputMap } from '../../../backend/src/shared/ApiMethodOutputMap';

const apiCall = {
  async post<TMethod extends ApiMethod>(route: TMethod, payload: ApiMethodArgsMap[TMethod]) {
    const result = await FetchFacade.post<ApiMethodArgsMap[TMethod], ApiMethodOutputMap[TMethod]>(route, payload);
    if (result.ok) {
      return result.getValue();
    } else {
      console.log(result.errorMessage);
      throw new Error(result.errorMessage);
    }
  },

  async get<TMethod extends ApiMethod>(route: TMethod) {
    return await FetchFacade.get<ApiMethodOutputMap[TMethod]>(route);
  },
};

export default apiCall;
