import { BaseError } from '@Infra/Result';

import { PokerTableErrorCodes } from '../types/PokerTableJoin';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super(PokerTableErrorCodes.PlayerAlreadySeated, 'Player is already seated at the table');
  }
}
