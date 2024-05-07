import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';

import { Dealer } from './Dealer';
import { Game } from './Game';
import { PokerTable } from './PokerTable';

describe('Dealer', () => {
  let newPokerTable: PokerTable;

  beforeEach(() => {
    const pokerTableName = 'table_1';
    const numberOfSeats = 2;
    const { pokerTable } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);

    newPokerTable = pokerTable;
  });

  it('should create a new game', () => {
    Dealer.newGame(newPokerTable);

    const game = newPokerTable.getGame() as Game;

    expect(game).toBeInstanceOf(Game);
    expect(game.getGameState().getSmallBlind()).toBe(1);
    expect(game.getGameState().getBigBlind()).toBe(2);
    expect(game.getGameState().getPot()).toBe(0);
    expect(game.getGameState().getCurrentBet()).toBe(0);
    expect(game.getGameState().getPlayerToActIndex()).toBe(0);
    expect(game.getGameState().getRound()).toBe('pre-flop');
    expect(game.getGameState().getCommunityCards()).toEqual([]);
  });

  it('should deal cards to players', () => {
    Dealer.newGame(newPokerTable);
    Dealer.dealCards(newPokerTable);

    const seats = newPokerTable.getSeats();

    seats.forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        expect(player.getCards().length).toBe(2);
      }
    });
  });
});
