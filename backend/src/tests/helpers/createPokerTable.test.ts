import { createPokerTable } from '@tests/helpers/createPokerTable';

describe('createPokerTable', () => {
  it('should create a poker table', () => {
    const pokerTable = createPokerTable('table_1', 2);

    expect(pokerTable.getName()).toEqual('table_1');
    expect(pokerTable.getAvailableSeatNumbers().length).toEqual(2);
  });
});
