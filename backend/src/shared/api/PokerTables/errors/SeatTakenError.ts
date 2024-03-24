import { BaseError } from '@Infra/Result';

import { PokerTableErrorCodes } from '../types/PokerTableJoin';

export class SeatTakenError extends BaseError {
  constructor() {
    super(PokerTableErrorCodes.SeatTaken, 'Seat is taken');
  }
}
