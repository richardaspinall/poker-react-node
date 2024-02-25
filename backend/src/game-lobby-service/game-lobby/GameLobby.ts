/*
Description:

This class will be the main class for the game lobby. It will be responsible for creating and managing poker tables
*/

// internal modules
import { PokerTable } from '../../game/PokerTable';

type TablesRecord = Record<string, PokerTable>;

export class GameLobby {
  // TODO: This would be a database eventually
  private tables: TablesRecord = {};

  public addTable(pokerTable: PokerTable) {
    this.tables[pokerTable.getName()] = pokerTable;
  }

  public getTables(): TablesRecord {
    return this.tables;
  }

  public isNameTaken(name: string): boolean {
    return !!this.tables[name];
  }

  // Methods remove tables, join/leave tables.
}
