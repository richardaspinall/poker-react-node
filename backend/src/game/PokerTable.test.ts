import Result from '../shared/Result';
import Rooms from '../sockets/Rooms';

import PokerTable from './PokerTable';
import GameLobbyService from '../game-lobby-service';

import createPokerTable from '../tests/helpers/createPokerTable';
import createPokerTableWithPlayers from '../tests/helpers/createPokerTableWithPlayers';

describe('PokerTable', () => {
  describe('sitAtTable', () => {
    it('should confirm a player has sat down', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;

      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const res = pokerTable.sitAtTable(tableName, 'seat-1', 'a1');

      expect(res.ok).toEqual(true);
      expect(res.isError).toEqual(false);
      expect(res.errorMessage).toEqual('');
    });

    it('should error when seat is already taken', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;

      const pokerTable = createPokerTable(tableName, numberOfSeats);

      pokerTable.sitAtTable(tableName, 'seat-1', 'a1');

      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const res = pokerTable.sitAtTable(tableName, 'seat-1', 'b2');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Seat is already taken');
    });

    it('should error when player is already sitting down', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;

      const pokerTable = createPokerTable(tableName, numberOfSeats);
      pokerTable.sitAtTable(tableName, 'seat-2', 'a1');
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const res = pokerTable.sitAtTable(tableName, 'seat-2', 'a1');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Player is already sitting at the table');
    });

    it('should error when seat number does not exist', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;

      const pokerTable = createPokerTable(tableName, numberOfSeats);
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
      const tableName = 'table_1';
      const numberOfSeats = 2;

      const pokerTable = createPokerTable(tableName, numberOfSeats);
      expect(pokerTable.getName()).toEqual('table_1');
    });
  });

  describe('leaveTable', () => {
    it('should confirm a player has left the table', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTableWithPlayers(tableName, numberOfSeats);

      const res = pokerTable.leaveTable('seat-1', 'a1');

      expect(res.ok).toEqual(true);
      expect(res.isError).toEqual(false);

      const availableSeats = pokerTable.getAvailableSeats();

      const seat1Available = availableSeats.some((seat) => seat.seatNumber === 'seat-1');
      expect(seat1Available).toBe(true);

      const seat2Available = availableSeats.some((seat) => seat.seatNumber === 'seat-2');
      expect(seat2Available).toBe(false);
    });

    it('should error when the player is not already sitting at the table', () => {
      const tableName = 'table_2';
      GameLobbyService.createPokerTable(tableName, 2);
      jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
      const pokerTable = GameLobbyService.getTable(tableName);

      if (!pokerTable) {
        // TODO: log error
        return;
      }
      const res = pokerTable.leaveTable('seat-1', 'b2');

      expect(res.ok).toEqual(false);
      expect(res.isError).toEqual(true);
      expect(res.errorMessage).toEqual('Player not found on table');
    });

    it('should return the available seats', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;

      GameLobbyService.createPokerTable(tableName, 2);
      GameLobbyService.createPokerTable(tableName, 2);

      const pokerTable = GameLobbyService.getTable(tableName);

      // const pokerTable = PokerTable.createPokerTable(tableName, numberOfSeats);

      const availableSeats = pokerTable?.getAvailableSeats();

      if (!availableSeats) {
        return;
      }

      expect(availableSeats.length).toEqual(numberOfSeats);
      expect(availableSeats[0].seatNumber).toEqual('seat-1');
      expect(availableSeats[1].seatNumber).toEqual('seat-2');
    });
  });

  describe('getAvailableSeats', () => {
    it('should return the available seats', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      GameLobbyService.createPokerTable(tableName, 2);
      const pokerTable = GameLobbyService.getTable(tableName);

      // const pokerTable = PokerTable.createPokerTable(tableName, numberOfSeats);

      const availableSeats = pokerTable?.getAvailableSeats();

      if (!availableSeats) {
        return;
      }

      expect(availableSeats.length).toEqual(numberOfSeats);
      expect(availableSeats[0].seatNumber).toEqual('seat-1');
      expect(availableSeats[1].seatNumber).toEqual('seat-2');
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
