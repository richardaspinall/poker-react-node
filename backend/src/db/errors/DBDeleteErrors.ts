import { BaseError } from '@Infra/Result';

export class DBDeleteError extends BaseError {
  constructor(public tableName: string) {
    super('deletion_failed', `Deletion failed to: ${tableName}`);
  }
}
