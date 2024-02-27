// External
import request from 'supertest';

// Internal
import { httpServer } from '../../index';
import { shutDownServer } from '@tests/helpers/shutDownServer';
import { Rooms } from '../../sockets/Rooms';
import { ResultSuccess, ResultError } from '@shared/Result';
import { GameLobbyService } from '../../game-lobby-service';
import { RoomNotFoundError } from '@shared/errors/RoomErrors';

// Internal utils
import { Logger } from '../../utils/Logger';

const debug = Logger.newDebugger('test:tables');

describe('tables.join', () => {
  // TODO: need to add more unit tests for invalid requests and types
  it('should error when payload is invalid', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('table-1')));
    GameLobbyService.createPokerTable('table_1', 2);

    const res = await request(httpServer).post('/api/actions/tables.join').send({
      selectedSeatNumber: 1,
      socketId: 'abc123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.code).toEqual('INVALID_REQUEST_PAYLOAD');
  });

  // TODO: will eventually need to add the table they are sitting at but this is hardcoded
  // for now. See third commented out test
  it('should seat a player to a table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    GameLobbyService.createPokerTable('table_1', 2);
    const res = await request(httpServer).post('/api/actions/tables.join').send({
      selectedSeatNumber: 'seat-1',
      socketId: 'abc123',
    });
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when the seat is already taken', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError(new RoomNotFoundError('table-1')));
    GameLobbyService.createPokerTable('table_1', 2);
    await request(httpServer).post('/api/actions/tables.join').send({
      selectedSeatNumber: 'seat-1',
      socketId: 'abc123',
    });
    const res = await request(httpServer).post('/api/actions/tables.join').send({
      selectedSeatNumber: 'seat-1',
      socketId: 'def456',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error.message).toEqual('Seat is taken');
  });

  // it('should error when the table doesnt exist', async () => {
  //   mockSendEventToRoomError();
  //   const res = await request(httpServer).post('/api/actions/tables.join').send({
  //     table: 'table_doesnt_exist',
  //     selectedSeatNumber: 'seat-1',
  //     socketId: 'abc123',
  //   });

  //   expect(res.statusCode).toEqual(200);
  //   expect(res.body.ok).toEqual(false);
  //   expect(res.body.error).toEqual('Room not found');
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
