import PokerTable from './PokerTable';

describe('PokerTable', () => {
  let pokerTable: PokerTable;

  beforeEach(() => {
    pokerTable = new PokerTable('table_1', 2);
  });

  describe('getName', () => {
    it('should return the name of the table', () => {
      expect(pokerTable.getName()).toEqual('table_1');
    });
  });
});
