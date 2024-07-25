import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  hand: CardShortCode[];
  winningHand?: CardShortCode[];
};

export function determineHandWinner(players: Player[], communityCards: CardShortCode[]): Player[] {
  const winningPlayers: Player[] = [];

  players[0].winningHand = communityCards;
  players[1].winningHand = communityCards;
  winningPlayers.push(players[0]);
  winningPlayers.push(players[1]);

  // Determine the winning player(s) and add them to the winningPlayers array
  // winningPlayers.push(player);
  return winningPlayers;
}
