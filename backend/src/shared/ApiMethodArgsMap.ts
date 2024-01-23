import { PlayerSitPayload } from './api/types/PlayerSit';
import { PokerTableGetStatePayload } from './api/types/TableState';

export interface ApiMethodArgsMap {
  '/api/actions/tables.join': PlayerSitPayload;
  '/pokerTables.getState': PokerTableGetStatePayload;
}

export type ApiMethod = keyof ApiMethodArgsMap;
