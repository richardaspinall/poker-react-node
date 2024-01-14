import PokerTable from './PokerTable';
import Result from '../shared/Result';
import Rooms from '../sockets/Rooms';

import GameLobbyService from '../game-lobby-service';

describe('PokerTable', () => {
  describe('sitAtTable', () => {
    it('should confirm a player has sat down', () => {
      const tableName = 'table_1';
      GameLobbyService.createPokerTable(tableName, 2);
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const pokerTable = GameLobbyService.getTable(tableName);

      if (!pokerTable) {
        // TODO: log error
        return;
      }

      const res = pokerTable.sitAtTable(tableName, 'seat-1', 'a1');

      expect(res.ok).toEqual(true);
      expect(res.isError).toEqual(false);
      expect(res.errorMessage).toEqual('');
    });

    it('should error when seat is already taken', () => {
      const tableName = 'table_2';
      GameLobbyService.createPokerTable(tableName, 2);
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const pokerTable = GameLobbyService.getTable(tableName);

      if (!pokerTable) {
        // TODO: log error
        return;
      }

      pokerTable.sitAtTable(tableName, 'seat-1', 'a1');

      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const res = pokerTable.sitAtTable(tableName, 'seat-1', 'b2');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Seat is already taken');
    });

    it('should error when player is already sitting down', () => {
      const tableName = 'table_3';
      GameLobbyService.createPokerTable(tableName, 2);
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const pokerTable = GameLobbyService.getTable(tableName);

      if (!pokerTable) {
        // TODO: log error
        return;
      }
      pokerTable.sitAtTable(tableName, 'seat-2', 'a1');
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const res = pokerTable.sitAtTable(tableName, 'seat-2', 'a1');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Player is already sitting at the table');
    });

    it('should error when seat number does not exist', () => {
      const tableName = 'table_4';
      GameLobbyService.createPokerTable(tableName, 2);
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const pokerTable = GameLobbyService.getTable(tableName);

      if (!pokerTable) {
        // TODO: log error
        return;
      }
      const res = pokerTable.sitAtTable(tableName, 'seat-3', 'a1');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Seat not found');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });
  describe('getName', () => {
    it('should return the name of the table', () => {
      GameLobbyService.createPokerTable('table_1', 2);
      const pokerTable = GameLobbyService.getTable('table_1');
      expect(pokerTable?.getName()).toEqual('table_1');
    });
  });
});

describe('leaveTable', () => {
  it('should confirm a player has left the table', () => {
    const tableName = 'table_1';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    PokerTable.sitAtTable(tableName, 'seat-1', 'a1')
    const res = PokerTable.leaveTable(tableName, 'seat-1', 'a1')

    expect(res.ok).toEqual(true);
    expect(res.isError).toEqual(false);
    expect(res.errorMessage).toEqual('');
  });

  it('should error when the player is not already sitting at the table', () => {
    const tableName = 'table_2';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    const res = PokerTable.leaveTable(tableName, 'seat-1', 'b2')
    
    expect(res.ok).toEqual(false);
    expect(res.isError).toEqual(true);
    expect(res.errorMessage).toEqual('Player not found on table');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
