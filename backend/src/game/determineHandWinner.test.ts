import { CardShortCode } from '@shared/game/types/CardShortCode';

import { Player, determineHandWinner } from './determineHandWinner';

describe('determineHandWinner', () => {
  it('returns the winning player(s)', async () => {
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
    expect(winningPlayers[0].winningHand).toStrictEqual(['2C', '3C', '4C', '5C', '6C']);
    expect(winningPlayers[1].winningHand).toStrictEqual(['2C', '3C', '4C', '5C', '6C']);
  });
});
