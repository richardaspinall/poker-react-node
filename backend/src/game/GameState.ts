/* 
Description:

This class holds the state of a poker game
*/

import Deck from './Deck';

export default class GameState {
  constructor(
    private players = [],
    private deck = new Deck(),
    private communityCards = [],
    private pot = 0,
    private currentBet = 0,
    private currentPlayerIndex = 0,
    private roundState = 'pre-flop' // ... other properties like blinds, player actions, etc.
  ) {}

  // Methods to update the game state
}
