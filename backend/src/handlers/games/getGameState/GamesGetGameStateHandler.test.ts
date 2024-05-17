import { apiTestNoCookie } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';

describe('games.getGameState', () => {
  it('should error when payload is invalid', async () => {
    const res = await apiTestNoCookie('/api/games.getGameState', {
      pokerTableName: 1,
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toBe('invalid_request_payload');
  });

  it('should return method_not_implemented', async () => {
    const res = await apiTestNoCookie('/api/games.getGameState', {
      pokerTableName: 'table_1',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toBe('method_not_implemented');
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
