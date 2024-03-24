import { BaseError } from '@Infra/Result';

import { PokerTableErrorCodes } from '../types/PokerTableJoin';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super(PokerTableErrorCodes.TableDoesNotExist, 'Table does not exist');
  }
}
