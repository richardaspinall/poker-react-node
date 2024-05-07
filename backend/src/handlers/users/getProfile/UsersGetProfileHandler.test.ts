import { apiTest } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';
import { mockUserServiceGetUserByIdSuccess } from '@tests/mocks/userServiceMocks';

import { User } from '../../../users/User';

describe('getProfile', () => {
  it('should return the user profile successfully', async () => {
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/users.getProfile', {});

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
    expect(res.body).toEqual({
      ok: true,
      username: 'userone',
    });
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
