import { APIMethod, APIMethodMap } from '../../../backend/src/shared/api/gen/APIMethodMap';
import FetchFacade from './FetchFacade';

const apiCall = {
  async post<TMethod extends APIMethod>(
    route: TMethod,
    payload: APIMethodMap[TMethod]['request']
  ): Promise<APIMethodMap[TMethod]['response']> {
    const result = await FetchFacade.post<APIMethodMap[TMethod]['request'], APIMethodMap[TMethod]['response']>(
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

  async get<TMethod extends APIMethod>(route: TMethod) {
    return await FetchFacade.get<APIMethodMap[TMethod]['response']>(route);
  },
};

export default apiCall;
