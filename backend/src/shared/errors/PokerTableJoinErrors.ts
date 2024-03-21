import { BaseAPIError } from '@Shared/api/types/BaseOutput';

export class PokerTableDoesNotExistError extends BaseAPIError {
  constructor() {
    super('TABLE_DOES_NOT_EXIST', 'Table does not exist');
  }
}
