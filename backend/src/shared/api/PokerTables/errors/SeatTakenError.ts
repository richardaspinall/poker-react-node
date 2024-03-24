import { BaseError } from '@Infra/Result';

import { PokerTableJoinErrorCodes } from '../types/PokerTableJoin';

export class SeatTakenError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.SeatTaken, 'Seat is taken');
  }
}
