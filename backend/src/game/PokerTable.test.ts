// Internal
import { createPokerTable } from '@Tests/helpers/createPokerTable';
import { createPokerTableWithPlayers } from '@Tests/helpers/createPokerTableWithPlayers';
import { mockSendEventToRoomSuccess } from '@Tests/mocks/roomMocks';

describe('PokerTable', () => {
  describe('sitAtTable', () => {
    it('should confirm a player has sat down', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const res = pokerTable.sitAtTable('seat-1', 'a1');

      expect(res.isOk()).toEqual(true);
    });

    it('should error when seat is already taken', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const a1SitsSeat1 = pokerTable.sitAtTable('seat-1', 'a1');

      expect(a1SitsSeat1.isOk()).toEqual(true);

      const b1SitsSeat1 = pokerTable.sitAtTable('seat-1', 'b2');

      expect(b1SitsSeat1.isOk()).toEqual(false);
      expect(b1SitsSeat1.getError()?.code).toEqual('SEAT_TAKEN');
      expect(b1SitsSeat1.getError()?.message).toEqual('Seat is taken');
    });

    it('should error when player is already sitting down', () => {
      mockSendEventToRoomSuccess();
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const a1SitsSeat1 = pokerTable.sitAtTable('seat-1', 'a1');

      expect(a1SitsSeat1.isOk()).toEqual(true);

      const a1SitsSeat2 = pokerTable.sitAtTable('seat-2', 'a1');

      expect(a1SitsSeat2.isOk()).toEqual(false);
      expect(a1SitsSeat2.getError()?.code).toEqual('PLAYER_ALREADY_SEATED');
      expect(a1SitsSeat2.getError()?.message).toEqual('Player is already seated at the table');
    });

    it('should error when seat number does not exist', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const res = pokerTable.sitAtTable('seat-3', 'a1');

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
      const tableName = 'table_name';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      expect(pokerTable.getName()).toEqual('table_name');
    });
  });

  describe('leaveTable', () => {
    it('should confirm a player has left the table', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable, playerNames } = createPokerTableWithPlayers(tableName, numberOfSeats);
      const player1 = playerNames[0];

      const res = pokerTable.leaveTable('seat-1', player1);

      expect(res.isOk()).toEqual(true);

      const availableSeats = pokerTable.getAvailableSeats();
      const seat1IsAvailable = availableSeats.some((seat) => seat.seatNumber === 'seat-1');
      const seat2IsAvailable = availableSeats.some((seat) => seat.seatNumber === 'seat-2');

      expect(seat1IsAvailable).toBe(true);
      expect(seat2IsAvailable).toBe(false);
    });

    it('should error when the player is not already sitting at the table', () => {
      mockSendEventToRoomSuccess();
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const res = pokerTable.leaveTable('seat-1', 'a1');

      expect(res.isOk()).toEqual(false);
      expect(res.getError()?.code).toEqual('PLAYER_NOT_FOUND_AT_TABLE');
      expect(res.getError()?.message).toEqual('Player is not seated at the table');
    });

    it('should return the available seat', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable, playerNames } = createPokerTableWithPlayers(tableName, numberOfSeats);
      const player1 = playerNames[0];

      const res = pokerTable.leaveTable('seat-1', player1);

      expect(res.isOk()).toEqual(true);

      const availableSeats = pokerTable.getAvailableSeats();

      expect(availableSeats.length).toEqual(1);
    });
  });

  describe('getAvailableSeats', () => {
    it('should return two seats when a table has been created and no one has sat down', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const pokerTable = createPokerTable(tableName, numberOfSeats);

      const availableSeats = pokerTable.getAvailableSeats();

      expect(availableSeats.length).toEqual(2);
      expect(availableSeats[0].seatNumber).toEqual('seat-1');
      expect(availableSeats[1].seatNumber).toEqual('seat-2');
    });

    it('should return an empty array when there are no seats available', () => {
      const tableName = 'table_1';
      const numberOfSeats = 2;
      const { pokerTable } = createPokerTableWithPlayers(tableName, numberOfSeats);

      const availableSeats = pokerTable.getAvailableSeats();

      expect(availableSeats.length).toEqual(0);
      expect(availableSeats).toEqual([]);
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
