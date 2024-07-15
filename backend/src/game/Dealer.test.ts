import { createPokerTableWithPlayers } from '@tests/helpers/createPokerTableWithPlayers';

import { Dealer } from './Dealer';
import { Game } from './Game';
import { PokerTable } from './PokerTable';

describe('Dealer', () => {
  let newPokerTable: PokerTable;

  beforeEach(() => {
    const pokerTableName = 'table_1';
    const numberOfSeats = 3;
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
      let player;
      const game = newPokerTable.getGame() as Game;
      const seatToAct = game.getGameState().getSeatToAct();

      const seats = newPokerTable.getSeats();

      seats.forEach((seat) => {
        if (seat.getSeatNumber() === seatToAct) {
          player = seat.getPlayer();
          if (player) {
            Dealer.foldCards(newPokerTable, player.getUserId());
            const playerCards = player.getCards();
            // TODO: Fix this test new cards have been dealt after folding
            // Fix by creating a game with 3 players
            expect(playerCards.length).toEqual(0);
          }
        }
      });
    });
  });
});
