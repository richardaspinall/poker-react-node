// external modules
import request from 'supertest';

// internal modules
import httpServer, { shutDown } from '../../index';
import Logger from '../../utils/Logger';

// mocks (not all used here, but leaving cos it could be in future)
import {
  mockJoinRoomSuccess,
  mockJoinRoomError,
  mockSendEventToRoomSuccess,
  mockSendEventToRoomError,
} from '../../tests/mocks/roomMocks';

import Rooms from '../../sockets/Rooms';
import Result, { ResultSuccess, ResultError } from '../../shared/Result';
import GameLobbyService from '../../game-lobby-service';

const debug = Logger.newDebugger('test:tables');

describe('tables.join', () => {
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
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError('Room not found'));
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
    expect(res.body.error).toEqual('Seat is already taken');
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
  afterAll(async () => {
    await shutDown();
  });
});
