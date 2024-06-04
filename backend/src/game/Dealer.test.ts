import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';

import { Dealer } from './Dealer';
import { Game } from './Game';
import { PokerTable } from './PokerTable';
import { Player } from './Player';

describe('Dealer', () => {
  let newPokerTable: PokerTable;
  let newPlayers: Player[];

  beforeEach(() => {
    const pokerTableName = 'table_1';
    const numberOfSeats = 2;
    const { pokerTable, players } = createPokerTableWithPlayers(pokerTableName, numberOfSeats);

    newPokerTable = pokerTable;
    newPlayers = players;
  });

  it('should create a new game', () => {
    Dealer.newGame(newPokerTable);

    const game = newPokerTable.getGame() as Game;

    expect(game).toBeInstanceOf(Game);
    expect(game.getGameState().getSmallBlind()).toBe(1);
    expect(game.getGameState().getBigBlind()).toBe(2);
    expect(game.getGameState().getPot()).toBe(0);
    expect(game.getGameState().getCurrentBet()).toBe(0);
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

  describe('foldPlayer', () => {
    it('should return empty cards for folded player', () => {
      const player2 = newPlayers[1];
      Dealer.foldCards(newPokerTable, player2.getUserId());
      const player2Cards = player2.getCards();
      
      expect(player2Cards.length).toEqual(0);
    });
  });
});
