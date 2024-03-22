// External
import { RowDataPacket } from 'mysql2/promise';

// Internal
import { Result, ResultSuccess, ResultError } from '@Infra/Result';
import { MySqLInstance } from '../../db/my-sql';
import { DBInsertError, DBInsertDuplicateError } from '../../db/errors/DBInsertErrors';
import { DBSelectError } from '../../db/errors/DBSelectErrors';

export const mockMySqlInsertError = (table: string) => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.error(new DBInsertError(table)));
};

export const mockMySqlInsertDuplicateError = (table: string) => {
  jest
    .spyOn(MySqLInstance, 'insert')
    .mockImplementation(async () => await Result.error(new DBInsertDuplicateError(table)));
};

export const mockMySqlInsertSuccess = () => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.success());
};

export const mockMySqlSelectError = (table: string) => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await new ResultError(new DBSelectError(table)));
};

export const mockMySqlSelectSuccess = () => {
  jest
    .spyOn(MySqLInstance, 'select')
    .mockImplementation(
      async () =>
        await new ResultSuccess([{ user_id: 1000, username: 'raspinall', password: 'testpassword' }] as RowDataPacket[])
    );
};

export const mockMySqlClose = () => {
  jest.spyOn(MySqLInstance, 'close').mockImplementation(async () => {});
};
