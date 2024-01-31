import { PlayerSitPayload, PlayerSitOutput } from './types/PlayerSit';
import { PlayerLeavePayload, PlayerLeaveOutput } from './types/PlayerLeave';

export interface ApiMethodMap {
  // Add entries for each API method
  'tables.join': {
    request: PlayerSitPayload;
    response: PlayerSitOutput;
  };
  'tables.leave': {
    request: PlayerLeavePayload;
    response: PlayerLeaveOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
