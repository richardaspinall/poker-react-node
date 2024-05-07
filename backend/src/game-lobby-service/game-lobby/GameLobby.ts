import { GameService } from '../../game-service/GameService';
import { PokerTable } from '../../game/PokerTable';

type PokerTablesRecord = Record<string, PokerTable>;

/**
 * GameLobby is responsible for holding all the poker tables
 */
export class GameLobby {
  // TODO: This would be a database eventually
  private pokerTables: PokerTablesRecord = {};

  constructor() {
    GameService.initialize();
  }

  public addPokerTable(pokerTable: PokerTable) {
    this.pokerTables[pokerTable.getName()] = pokerTable;
  }

  public getPokerTables(): PokerTablesRecord {
    return this.pokerTables;
  }

  public isNameTaken(name: string): boolean {
    return !!this.pokerTables[name];
  }

  // Methods remove pokerTables, join/leave pokerTables.
}
