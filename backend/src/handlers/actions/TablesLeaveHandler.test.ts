// external modules
import request from 'supertest';

// internal modules
import httpServer, { shutDown } from '../../index';
import Logger from '../../utils/Logger';
import GameLobbyService from '../../game-lobby-service';

// mocks (not all used here, but leaving cos it could be in future)
import {
  mockJoinRoomSuccess,
  mockJoinRoomError,
  mockSendEventToRoomSuccess,
  mockSendEventToRoomError,
} from './roomMocks';

import Rooms from '../../sockets/Rooms';
import Result, { ResultSuccess, ResultError } from '../../shared/Result';

const debug = Logger.newDebugger('test:tables');

describe('tables.leave', () => {
  // TODO: will eventually need to add the table they are sitting at but this is hardcoded
  // for now. See third commented out test
  it('should remove a player from a table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    GameLobbyService.createPokerTable('table_1', 2);
    await request(httpServer).post('/api/actions/tables.join').send({
      selectedSeatNumber: 'seat-1',
      socketId: 'abc123',
    });
    const res = await request(httpServer).post('/api/actions/tables.leave').send({
        selectedSeatNumber: 'seat-1',
        socketId: 'abc123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(true);
  });

  it('should error when the player is not already sitting at the table', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-2'));
    GameLobbyService.createPokerTable('table_2', 2);
    const res = await request(httpServer).post('/api/actions/tables.leave').send({
      selectedSeatNumber: 'seat-2',
      socketId: 'def456',
    });

    expect(res.statusCode).toEqual(200);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error).toEqual('Player not found on table');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  // Shut down the server after all tests
  afterAll(async () => {
    await shutDown();
  });
});
