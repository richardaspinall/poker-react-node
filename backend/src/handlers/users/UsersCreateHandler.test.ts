import { apiTestNoCookie } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';

describe('users.create', () => {
  it('should error when payload is invalid', async () => {
    const res = await apiTestNoCookie('/api/actions/users.create', {
      username: '',
      password: 'abc123',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('invalid_request_payload');
  });

  it('should create a user', async () => {
    const res = await apiTestNoCookie('/api/actions/users.create', {
      username: 'test',
      password: 'abc123',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('method_not_implemented');
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
