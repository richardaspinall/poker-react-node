import { BaseError } from '@infra/BaseError';

import { PokerTableJoinErrorCodes } from '../../../shared/api/poker-tables/types/PokerTableJoin';

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super(PokerTableJoinErrorCodes.PlayerNotFound, 'Player is not seated at the table');
  }
}
