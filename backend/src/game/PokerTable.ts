/* 
Description:

This class is responsible for managing a single poker table. It will be responsible for managing the game state (which is a class), players at a table..
*/

import GameState from './GameState';

export default class PokerTable {
  constructor(private id: string, private gameState: GameState, private numSeats: number) {}

  // Methods to add/remove players, start game, etc.
}
