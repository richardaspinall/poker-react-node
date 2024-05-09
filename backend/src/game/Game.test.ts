import { Deck } from './Deck';
import { Game } from './Game';

describe('Game', () => {
  let game: Game;

  beforeEach(() => {
    game = new Game(0, 10, 20);
  });

  it('initializes with the correct values', async () => {
    expect(game.getGameState().getDealerPosition()).toBe(0);
    expect(game.getGameState().getSmallBlind()).toBe(10);
    expect(game.getGameState().getBigBlind()).toBe(20);
    expect(game.getGameState().getPot()).toBe(0);
    expect(game.getGameState().getCurrentBet()).toBe(0);
    expect(game.getGameState().getRound()).toBe('pre-flop');
    expect(game.getGameState().getCommunityCards()).toEqual([]);
  });

  it('starts the next round', async () => {
    game.startNextRound();
    expect(game.getGameState().getRound()).toBe('flop');
    game.startNextRound();
    expect(game.getGameState().getRound()).toBe('turn');
    game.startNextRound();
    expect(game.getGameState().getRound()).toBe('river');
  });

  it('gets the deck', async () => {
    const deck = game.getDeck();
    expect(deck).toBeInstanceOf(Deck);
  });
});
