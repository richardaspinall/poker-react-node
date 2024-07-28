import { CardShortCode } from '@shared/game/types/CardShortCode';

import {
  RankCountMap,
  RankSuitSplit,
  checkForFlush,
  checkForFullHouse,
  checkForStraight,
  combineHand,
  countRanks,
  getFullHouse,
  orderAndMapRanks,
  splitAndRankShortCode,
} from './determineHandWinner';

describe('combineHand', () => {
  it('combines the hand', async () => {
    // Arrange
    const communityCards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
    ];
    const holeCards = [CardShortCode.AceOfClubs, CardShortCode.SixOfClubs];

    // Act
    const combinedHand = combineHand(holeCards, communityCards);

    // Assert
    expect(combinedHand.sort()).toStrictEqual(['2C', '3C', '4C', '5C', '6C', 'AC', 'KH'].sort());
  });
});

describe('getRanks', () => {
  it('gets the first character of each card', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfClubs,
    ];

    // Act
    const ranks = splitAndRankShortCode(cards).sort();

    // Assert
    const expectedRanks = [
      { rank: 2, suit: 'C' },
      { rank: 3, suit: 'C' },
      { rank: 4, suit: 'C' },
      { rank: 5, suit: 'C' },
      { rank: 6, suit: 'C' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ].sort();

    expect(ranks).toStrictEqual(expectedRanks);
  });
});

describe('orderRanks', () => {
  it('maps to a number and orders', async () => {
    // Arrange
    const cards: string[] = ['2', '4', '3', 'K', 'A', '7', 'J'];

    // Act
    const ranks = orderAndMapRanks(cards);

    // Assert
    const expectedRanks = [2, 3, 4, 7, 11, 13, 14];
    expect(ranks).toStrictEqual(expectedRanks);
  });
});

describe('checkForFlush', () => {
  it('returns true for 5 clubs', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfClubs,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfClubs,
    ];

    // Act
    const flush = checkForFlush(cards);

    // Assert
    expect(flush).toBe(true);
  });

  it('returns false for no flush', async () => {
    // Arrange
    const cards: CardShortCode[] = [
      CardShortCode.TwoOfClubs,
      CardShortCode.ThreeOfDiamonds,
      CardShortCode.FourOfClubs,
      CardShortCode.FiveOfClubs,
      CardShortCode.KingOfHearts,
      CardShortCode.AceOfClubs,
      CardShortCode.SixOfHearts,
    ];

    // Act
    const flush = checkForFlush(cards);

    // Assert
    expect(flush).toBe(false);
  });
});

describe('checkForStraight', () => {
  it('returns true for 5 numbers in a row', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'H' },
      { rank: 3, suit: 'H' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
      { rank: 6, suit: 'H' },
      { rank: 9, suit: 'C' },
      { rank: 10, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });

  it('returns false for no 5 numbers in a row', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 3, suit: 'H' },
      { rank: 5, suit: 'H' },
      { rank: 6, suit: 'D' },
      { rank: 9, suit: 'S' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'C' },
    ];
    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(false);
  });

  it('returns true for A(1) - 5', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 1, suit: 'C' },
      { rank: 2, suit: 'H' },
      { rank: 3, suit: 'H' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
      { rank: 7, suit: 'H' },
      { rank: 9, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });

  it('returns true for 10 - A(14)', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 3, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert

    expect(straight).toBe(true);
  });
});

describe('countRanks', () => {
  it('returns a map with two 2s and two 4s', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 2, suit: 'H' },
      { rank: 4, suit: 'H' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
      { rank: 6, suit: 'H' },
      { rank: 9, suit: 'C' },
    ];

    // Act
    const rankCountMap = countRanks(cards);

    // Assert
    expect(rankCountMap[2]).toBe(2);
    expect(rankCountMap[3]).toBe(0);
    expect(rankCountMap[4]).toBe(2);
    expect(rankCountMap[5]).toBe(1);
    expect(rankCountMap[6]).toBe(1);
    expect(rankCountMap[7]).toBe(0);
    expect(rankCountMap[8]).toBe(0);
    expect(rankCountMap[9]).toBe(1);
    expect(rankCountMap[10]).toBe(0);
    expect(rankCountMap[11]).toBe(0);
    expect(rankCountMap[12]).toBe(0);
    expect(rankCountMap[13]).toBe(0);
    expect(rankCountMap[14]).toBe(0);
  });

  it('returns a map with three Aces (14) and two Kings (13)', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 3, suit: 'C' },
      { rank: 7, suit: 'H' },
      { rank: 13, suit: 'H' },
      { rank: 13, suit: 'D' },
      { rank: 14, suit: 'S' },
      { rank: 14, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    // Act
    const rankCountMap = countRanks(cards);

    // Assert
    expect(rankCountMap[2]).toBe(0);
    expect(rankCountMap[3]).toBe(1);
    expect(rankCountMap[4]).toBe(0);
    expect(rankCountMap[5]).toBe(0);
    expect(rankCountMap[6]).toBe(0);
    expect(rankCountMap[7]).toBe(1);
    expect(rankCountMap[8]).toBe(0);
    expect(rankCountMap[9]).toBe(0);
    expect(rankCountMap[10]).toBe(0);
    expect(rankCountMap[11]).toBe(0);
    expect(rankCountMap[12]).toBe(0);
    expect(rankCountMap[13]).toBe(2);
    expect(rankCountMap[14]).toBe(3);
  });
});

describe('checkForFullHouse', () => {
  it('returns Aces full of Kings', async () => {
    // Arrange
    const rankCountMap: RankCountMap = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 1,
      10: 1,
      11: 0,
      12: 0,
      13: 2,
      14: 3,
    };

    // Act
    const fullHouse = checkForFullHouse(rankCountMap);

    // Assert
    expect(fullHouse).toBe(true);
  });

  it('returns false for no full house', async () => {
    // Arrange
    const rankCountMap: RankCountMap = {
      2: 0,
      3: 0,
      4: 0,
      5: 1,
      6: 0,
      7: 1,
      8: 0,
      9: 1,
      10: 0,
      11: 2,
      12: 2,
      13: 0,
      14: 0,
    };

    // Act
    const fullHouse = checkForFullHouse(rankCountMap);

    // Assert
    expect(fullHouse).toBe(false);
  });
});

describe('getFullHouse', () => {
  it('returns Aces full of Kings ', async () => {
    // Arrange
    const rankCountMap: RankCountMap = {
      2: 0,
      3: 0,
      4: 0,
      5: 0,
      6: 0,
      7: 0,
      8: 0,
      9: 1,
      10: 1,
      11: 0,
      12: 0,
      13: 2,
      14: 3,
    };

    // Act
    const fullHouse = getFullHouse(rankCountMap);

    // Assert
    expect(fullHouse).toEqual({
      threeOfAKind: 14,
      twoOfAKind: 13,
    });
  });
});
