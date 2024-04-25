import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tables/types/PokerTableGetSeats';

import type { PokerTableGetSeatsOutput, PokerTableGetSeatsPayload } from './poker-tablesnew/types/PokerTableGetSeats';

export interface ApiMethodMap {
  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };

  'poker-tables.getSeats': {
    request: PokerTableGetSeatsPayload;
    response: PokerTableGetSeatsOutput;
  };
}
