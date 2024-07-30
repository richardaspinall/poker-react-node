import { ResultError, ResultSuccess } from '@infra/Result';
import { apiTest } from '@tests/helpers/apiTest';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';
import { mockUserServiceGetUserByIdSuccess } from '@tests/mocks/userServiceMocks';

import { GameLobbyService } from '../../../game-lobby-service';
import { Rooms } from '../../../sockets/Rooms';
import { RoomNotFoundError } from '../../../sockets/errors/RoomErrors';
import { User } from '../../../users/User';

describe('poker-tables.join', () => {
  // TODO: need to add more unit tests for invalid requests and types
  it.only('should error when payload is invalid', async () => {
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/poker-tables.join', {
      selectedSeatNumber: 'seat-1',
    });

    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toEqual('INVALID_REQUEST_PAYLOAD');
  });

  // TODO: will eventually need to add the table they are sitting at but this is hardcoded
  // for now. See third commented out test
  it('should seat a player to a table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    GameLobbyService.createPokerTable('table_1', 2);
    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    const res = await apiTest('/api/poker-tables.join', {
      selectedSeatNumber: 1,
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when the seat is already taken', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('table-1')));
    GameLobbyService.createPokerTable('table_1', 2);

    mockMySqlSelectSessionSuccess('userone');
    mockUserServiceGetUserByIdSuccess(new User(1, 'userone'));

    await apiTest('/api/poker-tables.join', {
      selectedSeatNumber: '1',
    });

    mockMySqlSelectSessionSuccess('usertwo');
    mockUserServiceGetUserByIdSuccess(new User(2, 'usertwo'));

    const res = await apiTest('/api/poker-tables.join', {
      selectedSeatNumber: '1',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual('Seat is taken');
  });

  // it('should error when the table doesnt exist', async () => {
  //   mockSendEventToRoomError();
  //   const res = await request(httpServer).post('/api/poker-tables.join').send({
  //     table: 'table_doesnt_exist',
  //     selectedSeatNumber: '1',
  //     socketId: 'abc123',
  //   });

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.ok).toEqual(false);
  //   expect(res.body.getError()).toEqual('Room not found');
  // });

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
