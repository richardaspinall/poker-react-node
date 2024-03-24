import { BaseError } from '@infra/BaseError';

export class DBInsertError extends BaseError {
  constructor(public tableName: string) {
    super('insertion_failed', `Insertion failed to: ${tableName}`);
  }
}

export class DBInsertDuplicateError extends BaseError {
  constructor(public tableName: string) {
    super('duplicate_entry', `Insertion failed to: ${tableName} because of duplicate entry`);
  }
}
