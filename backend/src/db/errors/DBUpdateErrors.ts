import { BaseError } from '@infra/BaseError';

export class DBUpdateError extends BaseError {
  constructor(public tableName: string) {
    super('UPDATE_FAILED', `Update failed to: ${tableName}`);
  }
}
