import { Card } from '@shared/game/types/Card';
import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  holeCards?: CardShortCode[];
  hand?: CardShortCode[];
};

type PlayerPokerHands = {
  straightFlush: boolean;
  fourOfAKind: boolean;
  fullHouse: boolean; // Take highest three cards and highest two cards
  flush: boolean;
  straight: boolean;
  threeOfAKind: boolean;
  threePair: boolean; // If three pair, take highest two and highest other card
  twoPair: boolean;
  onePair: boolean;
};

type Suit = 'C' | 'D' | 'H' | 'S';

export type RankSuitSplit = {
  rank: number;
  suit: Suit;
};

export type RankCountMap = { [key: number]: number };

const rankOrder: { [key: string]: number } = {
  '2': 2,
  '3': 3,
  '4': 4,
  '5': 5,
  '6': 6,
  '7': 7,
  '8': 8,
  '9': 9,
  '10': 10,
  'J': 11,
  'Q': 12,
  'K': 13,
  'A': 14,
};

export function determineHandWinner(players: Player[], communityCards: CardShortCode[]): Player[] {
  const winningPlayers: Player[] = [];

  // Determine the winning player(s) and add their full 5 card best hand to the player object
  // – player.hand = ['2C', '3C', '4C', '5C', '6C'];
  //
  // Add them to the winningPlayers array and return
  // – winningPlayers.push(player);

  /*
   * - Combine players hole cards with community cards (7 cards)
   * - Order the cards
   * - Check for flush (5 of same suit)
   * - Check for straight (5 in a row)
   * - Count each card (2 Aces, 3 Kings..)
   * - Check for full house
   *
   * After each of the checks, check off PlayerPokerHands
   */

  return winningPlayers;
}

// Combine players hole cards with community cards (7 cards)
export function combineHand(holeCards: CardShortCode[], communityCards: CardShortCode[]): CardShortCode[] {
  return [...holeCards, ...communityCards];
}

// Need to split '2C' so we can work and use logic against each character (`'2', 'C'`)
export function splitAndRankShortCode(cards: CardShortCode[]): RankSuitSplit[] {
  const rankSuitSplit: RankSuitSplit[] = [];

  cards.forEach((card) => {
    rankSuitSplit.push({ rank: rankOrder[card.charAt(0)], suit: card.charAt(1) as Suit });
  });

  rankSuitSplit.sort((a, b) => a.rank - b.rank);

  return rankSuitSplit;
}

// TODO: should return the highest flush
export function checkForFlush(cards: CardShortCode[]): boolean {
  const suitsCount = {
    C: 0,
    D: 0,
    H: 0,
    S: 0,
  };

  cards.forEach((card) => {
    const rank = card.charAt(1) as Suit;
    switch (rank) {
      case 'C':
        suitsCount.C += 1;
        break;
      case 'D':
        suitsCount.D += 1;
        break;
      case 'H':
        suitsCount.H += 1;
        break;
      case 'S':
        suitsCount.S += 1;
        break;
    }
  });

  return Object.values(suitsCount).some((count) => count >= 5);
}

export function getFlush(rankSuitSplit: RankSuitSplit[], suit: Suit): RankSuitSplit[] {
  const flush: RankSuitSplit[] = [];

  rankSuitSplit.forEach((card) => {
    if (card.suit === suit) {
      flush.push(card);
    }
  });

  // Take care of more than 5 cards of a flush (take highest)
  if (flush.length === 6) {
    return flush.splice(1, 6);
  }
  if (flush.length === 7) {
    return flush.splice(2, 7);
  }

  return flush;
}

// TODO: should return the highest straight
export function checkForStraight(rankSuitSplit: RankSuitSplit[]): { hasStraight: boolean; straight?: RankSuitSplit[] } {
  // 1234589 return true
  // 1245689 return false
  // 1256789 return true
  // 1234678 return false
  //
  // A = 0 or 14
  //

  let count = 1;
  let hasStraight = false;
  rankSuitSplit.sort((a, b) => a.rank - b.rank); // ensure its  been sorted

  const straight: RankSuitSplit[] = [];

  for (let index = 0; index < rankSuitSplit.length; index++) {
    const element = rankSuitSplit[index];
    const nextElement = rankSuitSplit[index + 1];

    // We have got our straight and it's not possible to have higher straight
    if (hasStraight && element.rank + 1 != nextElement?.rank) {
      straight.push(element);

      if (straight.length === 6) {
        straight.splice(0, 1);
      }
      if (straight.length === 7) {
        straight.splice(0, 2);
      }
      return { hasStraight, straight };
    }

    if (element.rank + 1 === nextElement?.rank) {
      count += 1;
      straight.push(element);
      console.log('add', element);
    } else {
      count = 1;

      if (!hasStraight) {
        straight.length = 0;

        // TODO: maybe unnecessary: don't continue if index is 2 or greater and we have a count of 0 and they don't have a straight already
        if (index >= 2) {
          return { hasStraight, straight };
        }
      }
    }

    if (count >= 5) {
      hasStraight = true;
    }
  }

  return { hasStraight, straight };
}

// Count each rank
export function countRanks(rankSuitSplit: RankSuitSplit[]): RankCountMap {
  const rankCountMap: RankCountMap = {
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
  };

  rankSuitSplit.forEach((rankSuit) => {
    rankCountMap[rankSuit.rank] += 1;
  });

  return rankCountMap;
}

export function checkForFullHouse(rankCountMap: RankCountMap): boolean {
  const threeOfAKind = Object.values(rankCountMap).some((count) => count === 3);
  const pair = Object.values(rankCountMap).some((count) => count === 2);

  if (threeOfAKind && pair) {
    return true;
  }
  return false;
}

export function getFullHouse(rankCountMap: RankCountMap) {
  const entries = Object.entries(rankCountMap);
  const reversedEntries = entries.reverse();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const threeOfAKind = reversedEntries.find(([_key, value]) => value === 3)?.[0];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const pair = reversedEntries.find(([_key, value]) => value === 2)?.[0];

  const fullHouse = {
    threeOfAKind: Number(threeOfAKind),
    pair: Number(pair),
  };

  return fullHouse;
}

// TODO: not sure if we need these
export function orderAndMapRanks(ranks: string[]): number[] {
  const ranksMappedToNumbers: number[] = [];

  ranks.forEach((rank) => {
    ranksMappedToNumbers.push(rankOrder[rank]);
  });

  return ranksMappedToNumbers.sort((a, b) => a - b);
}
