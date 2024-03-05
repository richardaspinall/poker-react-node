import { BaseError } from '@Infra/Result';

export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('TABLE_DOES_NOT_EXIST', 'Table does not exist');
  }
}
