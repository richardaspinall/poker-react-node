import { BaseError } from '@shared/Result';

export class DBDeleteError extends BaseError {
  constructor(public tableName: string) {
    super('DELETION_FAILED', `Deletion failed to: ${tableName}`);
  }
}
