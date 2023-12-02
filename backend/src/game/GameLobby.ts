/*
Description:

This class will be the main class for the game lobby. It will be responsible for creating and managing poker tables
*/

import GameState from './GameState';
import PokerTable from './PokerTable';

export default class GameLobby {
  private tables: PokerTable[] = [];
  constructor() {}

  public generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  public createTable(numSeats: number) {
    const gameState = new GameState();

    // TODO: add name for table
    const table = new PokerTable(this.generateId(), gameState, numSeats);

    // TODO: eventually save to a database
    this.tables.push(table);
    return table;
  }
  // Methods to create tables, remove tables, join/leave tables.
}
