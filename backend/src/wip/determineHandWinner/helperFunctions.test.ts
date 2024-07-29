import { CardShortCode } from '@shared/game/types/CardShortCode';

import {
  RankCountMap,
  RankSuitSplit,
  checkForFlush,
  checkForFullHouse,
  checkForStraight,
  combineHand,
  countRanks,
  getFlush,
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

describe('getFlush', () => {
  it('returns 5 clubs', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 3, suit: 'C' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
      { rank: 6, suit: 'C' },
      { rank: 9, suit: 'C' },
      { rank: 10, suit: 'C' },
    ];

    // Act
    const flush = getFlush(cards, 'C');

    // Assert
    const expectedCardss: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 3, suit: 'C' },
      { rank: 6, suit: 'C' },
      { rank: 9, suit: 'C' },
      { rank: 10, suit: 'C' },
    ];
    expect(flush).toEqual(expectedCardss);
  });

  it('returns 5 highest diamonds when there are 6 diamonds', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'D' },
      { rank: 3, suit: 'D' },
      { rank: 4, suit: 'S' },
      { rank: 5, suit: 'D' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'D' },
      { rank: 13, suit: 'D' },
    ];

    // Act
    const flush = getFlush(cards, 'D');

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 3, suit: 'D' },
      { rank: 5, suit: 'D' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'D' },
      { rank: 13, suit: 'D' },
    ];
    expect(flush).toEqual(expectedCards);
  });

  it('returns 5 highest spades when there are 7 spades', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'S' },
      { rank: 3, suit: 'S' },
      { rank: 4, suit: 'S' },
      { rank: 5, suit: 'S' },
      { rank: 11, suit: 'S' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'S' },
    ];

    // Act
    const flush = getFlush(cards, 'S');

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 4, suit: 'S' },
      { rank: 5, suit: 'S' },
      { rank: 11, suit: 'S' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'S' },
    ];
    expect(flush).toEqual(expectedCards);
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
    const expectedCards: RankSuitSplit[] = [
      { rank: 2, suit: 'H' },
      { rank: 3, suit: 'H' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
      { rank: 6, suit: 'H' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
  });

  it('returns true for 5 numbers in a row starting from position 2', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 4, suit: 'H' },
      { rank: 5, suit: 'H' },
      { rank: 6, suit: 'D' },
      { rank: 7, suit: 'S' },
      { rank: 8, suit: 'H' },
      { rank: 11, suit: 'C' },
    ];
    // Act
    const straight = checkForStraight(cards);

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 4, suit: 'H' },
      { rank: 5, suit: 'H' },
      { rank: 6, suit: 'D' },
      { rank: 7, suit: 'S' },
      { rank: 8, suit: 'H' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
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
    expect(straight.hasStraight).toBe(false);
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
    const expectedCards: RankSuitSplit[] = [
      { rank: 1, suit: 'C' },
      { rank: 2, suit: 'H' },
      { rank: 3, suit: 'H' },
      { rank: 4, suit: 'D' },
      { rank: 5, suit: 'S' },
    ];
    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
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
    const expectedCards: RankSuitSplit[] = [
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
  });

  it('returns highest straight for 10 - A(14) given 6 cards in a straight', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 2, suit: 'C' },
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
  });

  it('returns highest straight for 9 - 13 given 6 cards in a straight', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 8, suit: 'C' },
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 2, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
  });

  it('returns highest straight for 9 - 13 given 5 cards in a straight', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 4, suit: 'C' },
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 2, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
  });

  it('returns highest straight for 10 - A(14) given 7 cards in a straight', async () => {
    // Arrange
    const cards: RankSuitSplit[] = [
      { rank: 8, suit: 'C' },
      { rank: 9, suit: 'H' },
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    // Act
    const straight = checkForStraight(cards);

    // Assert
    const expectedCards: RankSuitSplit[] = [
      { rank: 10, suit: 'H' },
      { rank: 11, suit: 'D' },
      { rank: 12, suit: 'S' },
      { rank: 13, suit: 'H' },
      { rank: 14, suit: 'C' },
    ];

    expect(straight.hasStraight).toBe(true);
    expect(straight.straight).toEqual(expectedCards);
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
      pair: 13,
    });
  });
});
