import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Suit } from '../shared/game/types/Suit';
import { Player } from './Player';

describe('Player', () => {
  let player: Player;

  beforeEach(() => {
    player = new Player(1234, 'testuser');
  });

  it('initializes with the correct values', async () => {
    expect(player.getUserId()).toBe(1234);
    expect(player.getUsername()).toBe('testuser');
    expect(player.getCards()).toEqual([]);
  });

  it('sets and gets cards', async () => {
    const cards = [
      { rank: 'A', suit: Suit.Clubs, cardShortCode: CardShortCode.AceOfClubs },
      { rank: 'K', suit: Suit.Clubs, cardShortCode: CardShortCode.KingOfClubs },
    ];
    player.setCards(cards);
    expect(player.getCards()).toEqual(cards);
  });
});
