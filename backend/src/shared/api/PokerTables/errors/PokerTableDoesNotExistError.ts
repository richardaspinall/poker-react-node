import { BaseError } from '@Infra/Result';

import { PokerTableLeaveErrorCodes } from '../types/PokerTableLeave';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super(PokerTableLeaveErrorCodes.TableDoesNotExist, 'Table does not exist');
  }
}
