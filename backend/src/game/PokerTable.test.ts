import { createPokerTable } from '@tests/helpers/createPokerTable';
import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';
import { mockSendEventToRoomSuccess } from '@tests/mocks/roomMocks';

import { Game } from './Game';
import { Player } from './Player';

describe('PokerTable', () => {
  describe('addPlayer', () => {
    it('should confirm a player has sat down', () => {
      mockSendEventToRoomSuccess();

      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const user = new Player(1234, 'testuser');
      const res = pokerTable.join(1, user);

      expect(res.isOk()).toEqual(true);
    });

    it('should error when seat is already taken', () => {
      mockSendEventToRoomSuccess();

      const user = new Player(1234, 'testuser');
      const userTwo = new Player(4321, 'testusertwo');
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const a1SitsSeat1 = pokerTable.join(1, user);

      expect(a1SitsSeat1.isOk()).toEqual(true);

      const b1SitsSeat1 = pokerTable.join(1, userTwo);

      expect(b1SitsSeat1.isOk()).toEqual(false);
      expect(b1SitsSeat1.getError()?.code).toEqual('SEAT_TAKEN');
      expect(b1SitsSeat1.getError()?.message).toEqual('Seat is taken');
    });

    it('should error when player is already sitting down', () => {
      mockSendEventToRoomSuccess();
      const user = new Player(1234, 'testuser');
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const a1SitsSeat1 = pokerTable.join(1, user);

      expect(a1SitsSeat1.isOk()).toEqual(true);

      const a1SitsSeat2 = pokerTable.join(2, user);

      expect(a1SitsSeat2.isOk()).toEqual(false);
      expect(a1SitsSeat2.getError()?.code).toEqual('PLAYER_ALREADY_SEATED');
      expect(a1SitsSeat2.getError()?.message).toEqual('Player is already seated at the table');
    });

    it('should error when seat number does not exist', () => {
      const user = new Player(1234, 'testuser');
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const res = pokerTable.join(3, user);

      expect(res.isOk()).toEqual(false);
      expect(res.getError()?.code).toEqual('SEAT_NOT_FOUND');
      expect(res.getError()?.message).toEqual('Seat not found');
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });
  });
  describe('getName', () => {
    it('should return the name of the table', () => {
      const pokerTableName = 'table_name';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(pokerTableName, numberOfSeats);

      expect(pokerTable.getName()).toEqual('table_name');
    });
  });

  describe('leaveTable', () => {
    it('should confirm a player has left the table', () => {
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable, players } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);
      const player1 = players[0];

      const res = pokerTable.leave(1, player1.getUserId());

      expect(res.isOk()).toEqual(true);

      const availableSeats = pokerTable.getAvailableSeatNumbers();
      const seat1IsAvailable = availableSeats.some((seatNumber) => seatNumber === 1);
      const seat2IsAvailable = availableSeats.some((seatNumber) => seatNumber === 2);

      expect(seat1IsAvailable).toBe(true);
      expect(seat2IsAvailable).toBe(false);
    });

    it('should error when the player is not already sitting at the table', () => {
      mockSendEventToRoomSuccess();
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(pokerTableName, numberOfSeats);

      const res = pokerTable.leave(1, 1234);

      expect(res.isOk()).toEqual(false);
      expect(res.getError()?.code).toEqual('PLAYER_NOT_FOUND_AT_TABLE');
      expect(res.getError()?.message).toEqual('The player is not seated at the table');
    });

    it('should return the available seat', () => {
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable, players } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);
      const player1 = players[0];

      const res = pokerTable.leave(1, player1.getUserId());

      expect(res.isOk()).toEqual(true);

      const availableSeats = pokerTable.getAvailableSeatNumbers();

      expect(availableSeats.length).toEqual(1);
    });
  });

  describe('getAvailableSeats', () => {
    it('should return two seats when a table has been created and no one has sat down', () => {
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(pokerTableName, numberOfSeats);

      const availableSeats = pokerTable.getAvailableSeatNumbers();

      expect(availableSeats.length).toEqual(2);
      expect(availableSeats[0]).toEqual(1);
      expect(availableSeats[1]).toEqual(2);
    });

    it('should return an empty array when there are no seats available', () => {
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);

      const availableSeats = pokerTable.getAvailableSeatNumbers();

      expect(availableSeats.length).toEqual(0);
      expect(availableSeats).toEqual([]);
    });
  });

  describe('getGame', () => {
    it('should return the game', () => {
      const pokerTableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);
      pokerTable.addGame(new Game(0, 10, 20));

      const game = pokerTable.getGame();

      expect(game).toBeInstanceOf(Game);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
