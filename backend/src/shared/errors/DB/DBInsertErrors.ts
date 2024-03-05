import { BaseError } from '@Infra/Result';

export class DBInsertError extends BaseError {
  constructor(public tableName: string) {
    super('INSERTION_FAILED', `Insertion failed to: ${tableName}`);
  }
}

export class DBInsertDuplicateError extends BaseError {
  constructor(public tableName: string) {
    super('DUPLICATE_ENTRY', `Insertion failed to: ${tableName} because of duplicate entry`);
  }
}
