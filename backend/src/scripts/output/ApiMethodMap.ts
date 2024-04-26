import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tables/types/PokerTableGetSeats';

export interface ApiMethodMap {
  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };
}
