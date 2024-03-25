import { BaseError } from '@infra/BaseError';

export class DBDeleteError extends BaseError {
  constructor(public tableName: string) {
    super('deletion_failed', `Deletion failed to: ${tableName}`);
  }
}
