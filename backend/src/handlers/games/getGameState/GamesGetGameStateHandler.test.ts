import { apiTest } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';

describe('games.getGameState', () => {
  it('should error when payload is invalid', async () => {
    mockMySqlSelectSessionSuccess('userone');

    const res = await apiTest('/api/games.getGameState', {
      pokerTableName: 1,
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toBe('INVALID_REQUEST_PAYLOAD');
  });

  it('should return GAME_STATE_DOES_NOT_EXIST', async () => {
    mockMySqlSelectSessionSuccess('userone');

    const res = await apiTest('/api/games.getGameState', {
      pokerTableName: 'table_1',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toBe('GAME_STATE_DOES_NOT_EXIST');
  });

  // TODO: need to add more unit tests for actual game state response

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
