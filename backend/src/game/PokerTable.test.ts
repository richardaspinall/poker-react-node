import PokerTable from './PokerTable';
import Result from '../shared/Result';
import Rooms from '../sockets/Rooms';

describe('PokerTable.sitAtTable', () => {
  it('should confirm a player has sat down', () => {
    const tableName = 'table_1';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    const res = PokerTable.sitAtTable(tableName, 'seat-1', 'a1')

    expect(res.ok).toEqual(true);
    expect(res.isError).toEqual(false);
  });

  it('should error when seat is already taken', () => {
    const tableName = 'table_2';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    PokerTable.sitAtTable(tableName, 'seat-1', 'a1')
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    const res = PokerTable.sitAtTable(tableName, 'seat-1', 'b2')
    
    expect(res.ok).toEqual(false);
    expect(res.isError).toEqual(true);
    expect(res.errorMessage).toEqual('Seat is already taken');
  });

  it('should error when player is already sitting down', () => {
    const tableName = 'table_2';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    PokerTable.sitAtTable(tableName, 'seat-1', 'a1')
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    const res = PokerTable.sitAtTable(tableName, 'seat-2', 'a1')

    expect(res.ok).toEqual(false);
    expect(res.isError).toEqual(true);
    expect(res.errorMessage).toEqual('Player is already sitting at the table');
  });

  it('should error when seat number doesn\'t exist', () => {
    const tableName = 'table_3';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    const res = PokerTable.sitAtTable(tableName, 'seat-3', 'a1')

    expect(res.ok).toEqual(false);
    expect(res.isError).toEqual(true);
    expect(res.errorMessage).toEqual('Seat not found');
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
