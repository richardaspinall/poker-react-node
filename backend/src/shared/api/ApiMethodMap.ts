import { PlayerSitOutput, PlayerSitPayload } from './types/PlayerSit';

export interface ApiMethodMap {
  // Add entries for each API method
  'tables.join': {
    request: PlayerSitPayload;
    response: PlayerSitOutput;
  };
}

export type ApiMethod = keyof ApiMethodMap;
