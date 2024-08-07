import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  holeCards?: CardShortCode[];
  hand?: CardShortCode[];
};

export function determineHandWinner(players: Player[], communityCards: CardShortCode[]): Player[] {
  const winningPlayers: Player[] = [];
  const rankedOutcomes: { [key: number]: Player[] } = {};
  // Find the best ranked outcome per player
  players.forEach((player) => {
    const allPotentialCards: CardShortCode[] = [];
    if (player.holeCards) {
      allPotentialCards.push(...player.holeCards, ...communityCards);
      for (let index = 0; index < allOutcomes.length; index++) {
        const outcome = allOutcomes[index];
        if (outcome.every((card) => allPotentialCards.includes(card))) {
          player.hand = outcome;
          if (!rankedOutcomes[index]) {
            rankedOutcomes[index] = [];
          }
          rankedOutcomes[index].push(player);
          break;
        }
      }
    }
  });
  // Sort the outcomes and return the winner(s)
  const sortedKeys = Object.keys(rankedOutcomes)
    .map(Number)
    .sort((a, b) => a - b);
  if (sortedKeys.length > 0) {
    rankedOutcomes[sortedKeys[0]].forEach((winner) => {
      winningPlayers.push(winner);
    });
  }
  return winningPlayers;
}

// Outcomes
export const flushofClubsKingHigh: CardShortCode[] = [
  CardShortCode.TwoOfClubs,
  CardShortCode.ThreeOfClubs,
  CardShortCode.FourOfClubs,
  CardShortCode.FiveOfClubs,
  CardShortCode.KingOfClubs,
];
export const straightFlushClubsSixHigh: CardShortCode[] = [
  CardShortCode.SixOfClubs,
  CardShortCode.FiveOfClubs,
  CardShortCode.FourOfClubs,
  CardShortCode.ThreeOfClubs,
  CardShortCode.TwoOfClubs,
];
export const fourSevensKingHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.SevenOfHearts,
  CardShortCode.SevenOfSpades,
  CardShortCode.KingOfHearts,
];
export const fullHouseKingsSevens: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.KingOfClubs,
  CardShortCode.KingOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const fullHouseEightsKings: CardShortCode[] = [
  CardShortCode.EightOfSpades,
  CardShortCode.EightOfHearts,
  CardShortCode.KingOfSpades,
  CardShortCode.EightOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const fullHouseKingsThrees: CardShortCode[] = [
  CardShortCode.ThreeOfSpades,
  CardShortCode.ThreeOfClubs,
  CardShortCode.KingOfSpades,
  CardShortCode.KingOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const flushofClubsAceHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.ThreeOfClubs,
  CardShortCode.TenOfClubs,
  CardShortCode.AceOfClubs,
  CardShortCode.KingOfClubs,
];
export const threeEightsKingHigh: CardShortCode[] = [
  CardShortCode.EightOfSpades,
  CardShortCode.EightOfHearts,
  CardShortCode.TenOfClubs,
  CardShortCode.EightOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const straightEightHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.EightOfHearts,
  CardShortCode.FourOfClubs,
  CardShortCode.FiveOfDiamonds,
  CardShortCode.SixOfSpades,
];
export const pairOfAcesKingHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.AceOfSpades,
  CardShortCode.AceOfClubs,
  CardShortCode.FiveOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const threeSevensKingHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.EightOfSpades,
  CardShortCode.SevenOfHearts,
  CardShortCode.KingOfHearts,
];
export const twoPairKingsSevensAceHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.AceOfHearts,
  CardShortCode.KingOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const pairOfSevensKingHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.SixOfClubs,
  CardShortCode.EightOfSpades,
  CardShortCode.KingOfHearts,
];
export const twoPairKingsSevensQueenHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.SevenOfDiamonds,
  CardShortCode.QueenOfDiamonds,
  CardShortCode.KingOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const pairOfAcesKingHigh2: CardShortCode[] = [
  CardShortCode.JackOfHearts,
  CardShortCode.AceOfHearts,
  CardShortCode.SevenOfClubs,
  CardShortCode.AceOfSpades,
  CardShortCode.KingOfHearts,
];
export const aceHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.JackOfHearts,
  CardShortCode.EightOfSpades,
  CardShortCode.AceOfSpades,
  CardShortCode.KingOfHearts,
];
export const aceHigh2: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.JackOfHearts,
  CardShortCode.AceOfHearts,
  CardShortCode.NineOfDiamonds,
  CardShortCode.KingOfHearts,
];
export const kingHigh: CardShortCode[] = [
  CardShortCode.SevenOfClubs,
  CardShortCode.JackOfHearts,
  CardShortCode.SixOfClubs,
  CardShortCode.EightOfSpades,
  CardShortCode.KingOfHearts,
];

const allOutcomes: CardShortCode[][] = [
  straightFlushClubsSixHigh,
  fourSevensKingHigh,
  fullHouseKingsSevens,
  fullHouseKingsThrees,
  fullHouseEightsKings,
  flushofClubsAceHigh,
  flushofClubsKingHigh,
  straightEightHigh,
  threeEightsKingHigh,
  threeSevensKingHigh,
  twoPairKingsSevensAceHigh,
  twoPairKingsSevensQueenHigh,
  pairOfAcesKingHigh,
  pairOfAcesKingHigh2,
  pairOfSevensKingHigh,
  aceHigh2,
  kingHigh,
];
