import { PlayerSitOutput } from './api/types/PlayerSit';
import { PokerTableGetStateOutput } from './api/types/TableState';

export interface ApiMethodOutputMap {
  '/api/actions/tables.join': PlayerSitOutput;
  '/pokerTables.getState': PokerTableGetStateOutput;
}
