// internal modules
import GameLobby from './GameLobby';
import GameState from '../game/GameState';
import PokerTable from './PokerTable';
import Result from '../shared/Result';

const testDatabase = process.env.DATABASE;

class GameLobbyService {
  private gameLobby: GameLobby;

  constructor() {
    this.gameLobby = new GameLobby();

    // seed a table until we have a database
    if (!testDatabase) {
      this.createPokerTable('table_1', 2);
    }
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  public createPokerTable(name: string, numSeats: number): Result<void> {
    const gameState = new GameState();
    // do some checking on name through the GameLobby
    if (this.gameLobby.isNameTaken(name)) {
      return Result.error('name_is_taken');
    }
    const pokerTable = new PokerTable(name, this.generateId(), gameState, numSeats);
    this.gameLobby.addTable(pokerTable);
    return Result.success();
  }
}

export default new GameLobbyService();
