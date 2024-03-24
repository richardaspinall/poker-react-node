import { BaseError } from '@infra/BaseError';

import { PokerTableLeaveErrorCodes } from '../../../shared/api/poker-tables/types/PokerTableLeave';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super(PokerTableLeaveErrorCodes.TableDoesNotExist, 'Table does not exist');
  }
}
