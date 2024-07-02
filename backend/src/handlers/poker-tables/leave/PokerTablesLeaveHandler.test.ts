import { ResultError, ResultSuccess } from '@infra/Result';
import { apiTest } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';
import { mockUserServiceGetUserByIdSuccess } from '@tests/mocks/userServiceMocks';

import { GameLobbyService } from '../../../game-lobby-service';
import { Rooms } from '../../../sockets/Rooms';
import { RoomNotFoundError } from '../../../sockets/errors/RoomErrors';
import { User } from '../../../users/User';

describe('poker-tables.leave', () => {
  // TODO: need to add more unit tests for invalid requests and types
  it('should error when payload is invalid', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('table-1')));
    GameLobbyService.createPokerTable('table_1', 2);
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/poker-tables.leave', {
      selectedSeatNumber: 'seat-1',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('invalid_request_payload');
  });

  // TODO: will eventually need to add the table they are sitting at but this is hardcoded
  // for now. See third commented out test
  it('should remove a player from a table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    GameLobbyService.createPokerTable('table_1', 2);
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    await apiTest('/api/poker-tables.join', {
      selectedSeatNumber: 1,
    });
    const res = await apiTest('/api/poker-tables.leave', {
      selectedSeatNumber: 1,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when the player is not already sitting at the table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-2'));
    GameLobbyService.createPokerTable('table_2', 2);
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/poker-tables.leave', {
      selectedSeatNumber: '2',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.errorCode).toEqual('PLAYER_NOT_FOUND_AT_TABLE');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  /**
   *  Cleanup WS & HTTP servers
   */
  afterAll((done) => {
    (async () => {
      shutDownServer(done);
    })();
  });
});
