import { apiTestNoCookie } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlInsertDuplicateError, mockMySqlInsertSuccess, mockMySqlSelectSuccess } from '@tests/mocks/dbMocks';

describe('users.create', () => {
  it('should error when payload is invalid', async () => {
    const res = await apiTestNoCookie('/api/users.create', {
      username: '',
      password: 'abc123',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toEqual('INVALID_REQUEST_PAYLOAD');
  });

  it('should create a user', async () => {
    mockMySqlInsertSuccess();
    mockMySqlSelectSuccess();

    const res = await apiTestNoCookie('/api/users.create', {
      username: 'test',
      password: 'abc123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when username is already taken', async () => {
    mockMySqlInsertDuplicateError('users');

    const res = await apiTestNoCookie('/api/users.create', {
      username: 'test',
      password: 'abc123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toEqual('USERNAME_TAKEN');
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
