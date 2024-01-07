/*
Description:

This class will be the main class for the game lobby. It will be responsible for creating and managing poker tables
*/

// internal modules
import PokerTable from './PokerTable';

export default class GameLobby {
  // TODO: This would be a database eventually
  private tables: PokerTable[] = [];

  public addTable(pokerTable: PokerTable) {
    this.tables.push(pokerTable);
  }

  public isNameTaken(name: string): boolean {
    return !!this.tables.find((table) => table.getName() === name);
  }
  // Methods remove tables, join/leave tables.
}
