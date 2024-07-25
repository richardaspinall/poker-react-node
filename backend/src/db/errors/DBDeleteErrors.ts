import { BaseError } from '@infra/BaseError';

export class DBDeleteError extends BaseError {
  constructor(public tableName: string) {
    super('DELETION_FAILED', `Deletion failed to: ${tableName}`);
  }
}
