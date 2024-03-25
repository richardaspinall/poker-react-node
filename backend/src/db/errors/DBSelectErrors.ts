import { BaseError } from '@infra/BaseError';

export class DBSelectError extends BaseError {
  constructor(public tableName: string) {
    super('select_failed', `Selection failed to: ${tableName}`);
  }
}
