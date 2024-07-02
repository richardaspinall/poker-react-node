import { apiTest } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';
import { mockUserServiceGetUserByIdSuccess } from '@tests/mocks/userServiceMocks';

import { User } from '../../../users/User';

describe('poker-tables.getSeats', () => {
  // TODO: need to add more unit tests for invalid requests and types
  it('should error when payload is invalid', async () => {
    mockMySqlSelectSessionSuccess('userone');

    const res = await apiTest('/api/poker-tables.getSeats', {
      pokerTableName: 1,
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toBe('invalid_request_payload');
  });

  it('should return table_does_not_exist', async () => {
    mockMySqlSelectSessionSuccess('userone');

    const res = await apiTest('/api/poker-tables.getSeats', {
      pokerTableName: 'bad_table_name',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toBe('POKER_TABLE_DOES_NOT_EXIST');
  });

  it('should return all seats for a table', async () => {
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/poker-tables.getSeats', {
      pokerTableName: 'table_1', // hardcoded table name in server
    });

    expect(res.body.ok).toEqual(true);
    expect(res.body).toEqual({
      ok: true,
      seats: [
        {
          seatNumber: 1,
          username: '',
        },
        {
          seatNumber: 2,
          username: '',
        },
      ],
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
