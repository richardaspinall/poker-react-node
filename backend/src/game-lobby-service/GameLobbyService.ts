// internal modules
import GameLobby from './game-lobby/GameLobby';
import PokerTable from './poker-table/PokerTable';
import Result from '../shared/Result';

export default class GameLobbyService {
  private gameLobby: GameLobby;

  constructor() {
    this.gameLobby = new GameLobby();

    // seed a table until we have a database
    this.createPokerTable('table_1', 2);
  }

  public createPokerTable(name: string, numSeats: number): Result<void> {
    // do some checking on name through the GameLobby
    if (this.gameLobby.isNameTaken(name)) {
      return Result.error('name_taken');
    }

    const pokerTable = new PokerTable(name, numSeats);
    this.gameLobby.addTable(pokerTable);

    return Result.success();
  }

  public getTable(name: string): PokerTable | undefined {
    return this.gameLobby.getTables().find((table) => table.getName() === name);
  }
}
