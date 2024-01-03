import PokerTable from './PokerTable';
import Result from '../shared/Result';
import Rooms from '../sockets/Rooms';

describe('PokerTableMethods', () => {
  it('should error when there are still seats available', () => {
    const tableName = 'table_1';
    PokerTable.createPokerTable(tableName, 2);
    const table = PokerTable.getTable(tableName)
    const tableReady = PokerTable.checkTableReady(table)

    expect(tableReady.ok).toEqual(false);
    expect(tableReady.isError).toEqual(true);
    expect(tableReady.errorMessage).toEqual('Seats still empty');
  });
  
  it('should confirm a table is ready to start when all seats are full', () => {
    const tableName = 'table_2';
    PokerTable.createPokerTable(tableName, 2);
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    PokerTable.sitAtTable(tableName, 'seat-1', 'abc123')
    jest.spyOn(Rooms, 'sendEventToRoom').mockImplementation(() => Result.success());
    PokerTable.sitAtTable(tableName, 'seat-2', 'def345')
    const table = PokerTable.getTable(tableName)
    const tableReady = PokerTable.checkTableReady(table)

    expect(tableReady.ok).toEqual(true);
    expect(tableReady.isError).toEqual(false);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});
