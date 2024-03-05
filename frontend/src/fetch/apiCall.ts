import FetchFacade from './FetchFacade';

import { APIMethod, APIMethodMap } from '../../../backend/src/shared/api/ApiMethodMap';

const apiCall = {
  async post<TMethod extends APIMethod>(route: TMethod, payload: APIMethodMap[TMethod]['request']) {
    const result = await FetchFacade.post<APIMethodMap[TMethod]['request'], APIMethodMap[TMethod]['response']>(
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

  async get<TMethod extends APIMethod>(route: TMethod) {
    return await FetchFacade.get<APIMethodMap[TMethod]['response']>(route);
  },
};

export default apiCall;
