import { CardShortCode } from '@shared/game/types/CardShortCode';

export type Player = {
  name: string;
  hand: CardShortCode[];
};

export function determineHandWinner(players: Player[], communityCards: CardShortCode[]): Player[] {
  const winningPlayers: Player[] = [];

  winningPlayers.push(players[0]);
  winningPlayers.push(players[1]);

  // Determine the winning player(s) and add them to the winningPlayers array
  // winningPlayers.push(player);
  return winningPlayers;
}
