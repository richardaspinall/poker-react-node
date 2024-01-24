/*
Description:

This class will be the main class for the game lobby. It will be responsible for creating and managing poker tables
*/

// internal modules
import PokerTable from '../../game/PokerTable';

type TablesRecord = Record<string, PokerTable>; 

export default class GameLobby {
  // TODO: This would be a database eventually
  private tables: TablesRecord = {};

  public addTable(pokerTable: PokerTable) {
    this.tables[pokerTable.getName()] = pokerTable;
  }

  public getTables(): PokerTable[] {
    return Object.values(this.tables);
  }

  public isNameTaken(name: string): boolean {
    return Object.values(this.tables).some((table) => table.getName() === name);
  }

  // Methods remove tables, join/leave tables.
}
