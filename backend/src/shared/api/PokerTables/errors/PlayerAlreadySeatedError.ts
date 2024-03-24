import { BaseError } from '@Infra/Result';

import { PokerTableJoinErrorCodes } from '../types/PokerTableJoin';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.PlayerAlreadySeated, 'Player is already seated at the table');
  }
}
