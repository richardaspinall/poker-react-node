import { MySqLInstance } from '../db/my-sql';
import {
  mockMySqlClose,
  mockMySqlInsertDuplicateError,
  mockMySqlInsertSuccess,
  mockMySqlSelectError,
  mockMySqlSelectSuccess,
} from '../tests/mocks/dbMocks';
import { UserRepository } from './UserRepository';

describe('UserRepository', () => {
  mockMySqlClose();
  describe('createUser', () => {
    it('should create a user', async () => {
      mockMySqlInsertSuccess();
      mockMySqlSelectSuccess();
      const userId = await UserRepository.createUser({ username: 'testuser', password: 'testpassword' });

      const user = await UserRepository.getUserById(userId.getValue());

      expect(user.getValue().getUserId()).toEqual(1000);
      expect(user.getValue().getUsername()).toEqual('testuser');
    });
  });

  describe('createUser', () => {
    it('should return a duplicate entry', async () => {
      mockMySqlInsertDuplicateError('users');

      const userOrError = await UserRepository.createUser({ username: 'testuser', password: 'testpassword' });

      expect(userOrError.getError().code).toEqual('DUPLICATE_ENTRY');
      expect(userOrError.getError().message).toEqual('Insertion failed to: users because of duplicate entry');
    });
  });

  describe('getUserById', () => {
    it('should return a user', async () => {
      mockMySqlSelectSuccess();

      const user = await UserRepository.getUserById(1000);

      expect(user.getValue().getUserId()).toEqual(1000);
      expect(user.getValue().getUsername()).toEqual('testuser');
    });

    it('should return a select error', async () => {
      mockMySqlSelectError('users');

      const user = await UserRepository.getUserById(1000);

      expect(user.getError().code).toEqual('SELECT_FAILED');
      expect(user.getError().message).toEqual('Selection failed to: users');
    });
  });

  afterAll(async () => {
    // Close the database connection
    await MySqLInstance.close();
  });
});
