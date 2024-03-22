import { BaseError } from '@Infra/Result';

export class DBSelectError extends BaseError {
  constructor(public tableName: string) {
    super('select_failed', `Selection failed to: ${tableName}`);
  }
}
