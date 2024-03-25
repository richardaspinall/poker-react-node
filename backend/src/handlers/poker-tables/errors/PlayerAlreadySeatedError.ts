import { BaseError } from '@infra/BaseError';

import { PokerTableJoinErrorCodes } from '../../../shared/api/poker-tables/types/PokerTableJoin';

export class PlayerAlreadySeatedError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.PlayerAlreadySeated, 'Player is already seated at the table');
  }
}
