import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Player, determineHandWinner } from './determineHandWinner';

describe('determineHandWinner', () => {
  it('returns a tie)', async () => {
    const players: Player[] = [];
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.SixOfClubs,
    ];

    players.push({
      name: 'Player 1',
      hand: [CardShortCode.AceOfClubs, CardShortCode.AceOfDiamonds],
    });

    players.push({
      name: 'Player 2',
      hand: [CardShortCode.KingOfClubs, CardShortCode.KingOfDiamonds],
    });

    const winningPlayers = determineHandWinner(players, communityCards);

    expect(winningPlayers.length).toBe(2);
    expect(winningPlayers[0].name).toBe('Player 1');
    expect(winningPlayers[1].name).toBe('Player 2');
  });
});
