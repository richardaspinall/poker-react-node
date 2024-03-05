import { BaseError } from '@Infra/Result';

export class DBDeleteError extends BaseError {
  constructor(public tableName: string) {
    super('DELETION_FAILED', `Deletion failed to: ${tableName}`);
  }
}
