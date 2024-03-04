import { BaseError } from '@shared/Result';

export class DBSelectError extends BaseError {
  constructor(public tableName: string) {
    super('SELECT_FAILED', `Select failed for: ${tableName}`);
  }
}
