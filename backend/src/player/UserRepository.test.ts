// Internal
import { MySqLInstance } from '../db/MySql';
import { UserRepository } from './UserRepository';

import {
  mockMySqlInsertSuccess,
  mockMySqlInsertDuplicateError,
  mockMySqlSelectSuccess,
  mockMySqlSelectError,
} from '../tests/mocks/dbMocks';

describe('UserRepository', () => {
  describe('createUser', () => {
    it('should create a user', async () => {
      mockMySqlInsertSuccess();
      const userId = await UserRepository.createUser({ username: 'raspinall', password: 'testpassword' });

      const user = await UserRepository.getUserById(userId.getValue());
      expect(user.getValue().getId()).toEqual(1000);
      expect(user.getValue().getName()).toEqual('raspinall');
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      mockMySqlInsertDuplicateError();
      const userOrError = await UserRepository.createUser({ username: 'raspinall', password: 'testpassword' });

      expect(userOrError.error?.code).toEqual('DUPLICATE_ENTRY');
      expect(userOrError.error?.message).toEqual('Insertion failed to: users because of duplicate entry');
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      mockMySqlSelectSuccess();

      const user = await UserRepository.getUserById(1000);
      expect(user.getValue().getId()).toEqual(1000);
      expect(user.getValue().getName()).toEqual('raspinall');
    });

    it('should return a select error', async () => {
      mockMySqlSelectError();

      const user = await UserRepository.getUserById(1000);
      expect(user.error?.code).toEqual('SELECT_FAILED');
      expect(user.error?.message).toEqual('Select failed for: users');
    });
  });

  afterAll(async () => {
    // Close the database connection
    await MySqLInstance.close();
  });
});