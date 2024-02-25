// External
import request from 'supertest';

// Internal
import { httpServer } from '../../index';
import { Logger } from '../../utils/Logger';
import { GameLobbyService } from '../../game-lobby-service';
import { shutDownServer } from '../../tests/helpers/shutDownServer';
import { Rooms } from '../../sockets/Rooms';
import { ResultSuccess, ResultError } from '../../shared/Result';

const debug = Logger.newDebugger('test:tables');

describe('tables.leave', () => {
  // TODO: need to add more unit tests for invalid requests and types
  it('should error when payload is invalid', async () => {
    jest.spyOn(Rooms, 'createRoom').mockImplementation(() => new ResultSuccess('table-1'));
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => new ResultError('Room not found'));
    GameLobbyService.createPokerTable('table_1', 2);

    const res = await request(httpServer).post('/api/actions/tables.leave').send({
      selectedSeatNumber: 1,
      socketId: 'abc123',
    });

    expect(res.statusCode).toEqual(400);
    expect(res.body.ok).toEqual(false);
    expect(res.body.error).toEqual('Invalid request payload');
  });

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

  /**
   *  Cleanup WS & HTTP servers
   */
  afterAll((done) => {
    (async () => {
      shutDownServer(done);
    })();
  });
});
