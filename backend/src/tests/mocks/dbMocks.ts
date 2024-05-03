import { RowDataPacket } from 'mysql2/promise';

import { Result, ResultError, ResultSuccess } from '@infra/Result';

import { DBInsertDuplicateError, DBInsertError } from '../../db/errors/DBInsertErrors';
import { DBSelectError } from '../../db/errors/DBSelectErrors';
import { MySqLInstance } from '../../db/my-sql';

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

export const mockMySqlDeleteSuccess = () => {
  jest.spyOn(MySqLInstance, 'delete').mockImplementation(async () => await Result.success());
};

export const mockMySqlSelectError = (table: string) => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await new ResultError(new DBSelectError(table)));
};

export const mockMySqlSelectSuccess = () => {
  jest
    .spyOn(MySqLInstance, 'select')
    .mockImplementation(
      async () =>
        await new ResultSuccess([{ user_id: 1000, username: 'testuser', password: 'testpassword' }] as RowDataPacket[]),
    );
};

export const mockMySqlSelectSuccessWithNoRows = () => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await new ResultSuccess([] as RowDataPacket[]));
};

export const mockMySqlClose = () => {
  jest.spyOn(MySqLInstance, 'close').mockImplementation(async () => {});
};
