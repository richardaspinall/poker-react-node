import { BaseError } from '@Infra/Result';

export class DBSelectError extends BaseError {
  constructor(public tableName: string) {
    super('SELECT_FAILED', `Selection failed to: ${tableName}`);
  }
}
