import { BaseError } from '@Infra/Result';
export class PokerTableDoesNotExistError extends BaseError {
  constructor() {
    super('table_does_not_exist', 'Table does not exist');
  }
}
