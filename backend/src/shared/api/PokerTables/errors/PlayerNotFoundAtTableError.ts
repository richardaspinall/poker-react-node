import { BaseError } from '@Infra/Result';

import { PokerTableErrorCodes } from '../types/PokerTableJoin';

export class PlayerNotFoundAtTableError extends BaseError {
  constructor() {
    super(PokerTableErrorCodes.PlayerNotFound, 'Player is not seated at the table');
  }
}
