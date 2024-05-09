import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Suit } from '../shared/game/types/Suit';
import { GameState, Round } from './GameState';

describe('GameState', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState(0, 10, 20);
  });

  it('initializes with the correct values', async () => {
    expect(gameState.getDealerPosition()).toBe(0);
    expect(gameState.getSmallBlind()).toBe(10);
    expect(gameState.getBigBlind()).toBe(20);
    expect(gameState.getPot()).toBe(0);
    expect(gameState.getCurrentBet()).toBe(0);
    expect(gameState.getRound()).toBe(Round.preFlop);
    expect(gameState.getCommunityCards()).toEqual([]);
  });

  it('updates the community cards', async () => {
    const communityCards = [
      { rank: 'A', suit: Suit.Clubs, cardShortCode: CardShortCode.AceOfClubs },
      { rank: 'K', suit: Suit.Clubs, cardShortCode: CardShortCode.KingOfClubs },
      { rank: 'Q', suit: Suit.Clubs, cardShortCode: CardShortCode.QueenOfClubs },
      { rank: 'J', suit: Suit.Clubs, cardShortCode: CardShortCode.JackOfClubs },
      { rank: '10', suit: Suit.Clubs, cardShortCode: CardShortCode.TenOfClubs },
    ];

    gameState.updateCommunityCards(communityCards);
    expect(gameState.getCommunityCards()).toEqual(communityCards);
  });

  it('updates the pot', async () => {
    gameState.updatePot(100);
    expect(gameState.getPot()).toBe(100);
  });

  it('updates the current bet', async () => {
    gameState.updateCurrentBet(50);
    expect(gameState.getCurrentBet()).toBe(50);
  });

  it('updates the current player index', async () => {
    gameState.updateSeatToAct(2);
    expect(gameState.getSeatToAct()).toBe(2);
  });

  it('updates the round', async () => {
    gameState.updateRound(Round.flop);
    expect(gameState.getRound()).toBe(Round.flop);
  });
});
