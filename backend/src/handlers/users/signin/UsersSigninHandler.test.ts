import { apiTestNoCookie } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockGetSessionIdByUsername } from '@tests/mocks/db-mocks/users-sessions/mocks';
import { mockUserRepositoryGetPasswordSuccess } from '@tests/mocks/userRepositoryMocks';

import {
  mockMySqlInsertSuccess,
  mockMySqlSelectSuccess,
  mockMySqlSelectSuccessWithNoRows,
} from '../../../tests/mocks/dbMocks';

describe('signin', () => {
  it('should authenticate the user successfully with correct credentials', async () => {
    mockMySqlInsertSuccess();

    const res = await apiTestNoCookie('/api/users.signin', {
      username: 'testuser',
      password: 'testpassword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when payload is invalid', async () => {
    const res = await apiTestNoCookie('/api/users.signin', {
      username: '',
      password: '',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('invalid_request_payload');
  });

  it('should respond with a password_invalid error when signing in with a password that is invalid', async () => {
    mockMySqlSelectSuccess();

    const res = await apiTestNoCookie('/api/users.signin', {
      username: 'testuser',
      password: 'invalidpassword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
  });

  it('should respond with a username_not_found when signing in with a username that does not exist', async () => {
    mockMySqlSelectSuccessWithNoRows();

    const res = await apiTestNoCookie('/api/users.signin', {
      username: 'invaliduser',
      password: 'invalidpasword',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('username_not_found');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Shut down the server after all tests
  afterAll((done) => {
    (async () => {
      shutDownServer(done);
    })();
  });
});
