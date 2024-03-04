// Internal
import { MySqLInstance } from '../../db/MySql';

// External
import { RowDataPacket } from 'mysql2/promise';

// Internal
import { Result, ResultSuccess, ResultError } from '@shared/Result';
import { DBInsertError, DBInsertDuplicateError } from '@shared/errors/DB/DBInsertErrors';
import { DBSelectError } from '@shared/errors/DB/DBSelectErrors';

export const mockMySqlInsertError = () => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.error(new DBInsertError('users')));
};

// TODO: add params to the mock
export const mockMySqlInsertDuplicateError = () => {
  jest
    .spyOn(MySqLInstance, 'insert')
    .mockImplementation(async () => await Result.error(new DBInsertDuplicateError('users')));
};

export const mockMySqlInsertSuccess = () => {
  jest.spyOn(MySqLInstance, 'insert').mockImplementation(async () => await Result.success());
};

export const mockMySqlSelectError = () => {
  jest.spyOn(MySqLInstance, 'select').mockImplementation(async () => await new ResultError(new DBSelectError('users')));
};

export const mockMySqlSelectSuccess = () => {
  jest
    .spyOn(MySqLInstance, 'select')
    .mockImplementation(
      async () =>
        await new ResultSuccess([{ user_id: 1000, username: 'raspinall', password: 'testpassword' }] as RowDataPacket[])
    );
};
