import { BaseError } from '@Infra/Result';

import { PokerTableJoinErrorCodes } from '../types/PokerTableJoin';

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.PlayerNotFound, 'Player is not seated at the table');
  }
}
