// Internal
import { MySqLInstance } from '../db/my-sql';
import { UserRepository } from './UserRepository';

import {
  mockMySqlInsertSuccess,
  mockMySqlInsertDuplicateError,
  mockMySqlSelectSuccess,
  mockMySqlSelectError,
  mockMySqlClose,
} from '../tests/mocks/dbMocks';

describe('UserRepository', () => {
  mockMySqlClose();
  describe('createUser', () => {
    it('should create a user', async () => {
      mockMySqlInsertSuccess();
      mockMySqlSelectSuccess();
      const userId = await UserRepository.createUser({ username: 'testuser', password: 'testpassword' });

      const user = await UserRepository.getUserById(userId.getValue());
      expect(user.getValue().getId()).toEqual(1000);
      expect(user.getValue().getName()).toEqual('testuser');
    });
  });

  describe('createUser', () => {
    it('should create a user', async () => {
      mockMySqlInsertDuplicateError('users');
      const userOrError = await UserRepository.createUser({ username: 'testuser', password: 'testpassword' });

      expect(userOrError.getError().code).toEqual('duplicate_entry');
      expect(userOrError.getError().message).toEqual('Insertion failed to: users because of duplicate entry');
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      mockMySqlSelectSuccess();

      const user = await UserRepository.getUserById(1000);
      expect(user.getValue().getId()).toEqual(1000);
      expect(user.getValue().getName()).toEqual('testuser');
    });

    it('should return a select error', async () => {
      mockMySqlSelectError('users');

      const user = await UserRepository.getUserById(1000);
      expect(user.getError().code).toEqual('select_failed');
      expect(user.getError().message).toEqual('Selection failed to: users');
    });
  });

  afterAll(async () => {
    // Close the database connection
    await MySqLInstance.close();
  });
});
