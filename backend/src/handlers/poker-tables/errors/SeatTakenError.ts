import { BaseError } from '@infra/BaseError';

import { PokerTableJoinErrorCodes } from '../../../shared/api/poker-tables/types/PokerTableJoin';

export class SeatTakenError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.SeatTaken, 'Seat is taken');
  }
}
