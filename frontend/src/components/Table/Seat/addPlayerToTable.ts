import FetchFasade from '../../../fetch/FetchFasade';

import { PlayerSitPayload, PlayerSitOutput } from '../../../../../backend/src/shared/api/types/PlayerSit';
import { useCallback } from 'react';
import Result from '../../../../../backend/src/shared/Result';

// TODO: should check state to see if player is already seated etc. This will be a good
// example of how to use the state in the thunk
export default function useJoinTable() {
  return useCallback(async (payload: any): Promise<Result<PlayerSitOutput>> => {
    return await FetchFasade.post<PlayerSitPayload, PlayerSitOutput>('/api/actions/tables.join', payload);
  }, []);
}
