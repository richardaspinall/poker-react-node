import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';

describe('createPokerTable', () => {
  it('should create a poker table', () => {
    const { pokerTable, players } = createPokerTableWithPlayers('table_1', 2);
    const player1 = players[0];
    const player2 = players[1];

    expect(pokerTable.getName()).toEqual('table_1');
    expect(pokerTable.getAvailableSeats().length).toEqual(0);
    expect(player1.getUsername()).toEqual('a1');
    expect(player2.getUsername()).toEqual('a2');
  });
});
