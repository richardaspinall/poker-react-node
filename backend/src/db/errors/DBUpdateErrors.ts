import { BaseError } from '@infra/BaseError';

export class DBUpdateError extends BaseError {
  constructor(public tableName: string) {
    super('update_failed', `Update failed to: ${tableName}`);
  }
}
