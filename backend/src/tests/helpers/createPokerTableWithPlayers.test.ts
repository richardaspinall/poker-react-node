import createPokerTableWithPlayers from './createPokerTableWithPlayers';
describe('createPokerTable', () => {
  it('should create a poker table', () => {
    const { pokerTable, playerNames } = createPokerTableWithPlayers('table_1', 2);
    const player1 = playerNames[0];
    const player2 = playerNames[1];

    expect(pokerTable.getName()).toEqual('table_1');
    expect(pokerTable.getAvailableSeats().length).toEqual(0);
    expect(player1).toEqual('a1');
    expect(player2).toEqual('a2');
  });
});
