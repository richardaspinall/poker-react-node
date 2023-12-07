// internal modules
import GameLobby from './GameLobby';
import GameState from './GameState';
import PokerTable from './PokerTable';
import Result from '../shared/Result';

export default class GameService {
  private gameLobby: GameLobby;

  constructor() {
    this.gameLobby = new GameLobby();

    // seed a table until we have a database
    this.createPokerTable('table-1', 2);
  }

  private generateId() {
    return Math.random().toString(36).substr(2, 9);
  }

  public createPokerTable(name: string, numSeats: number): Result<void> {
    const gameState = new GameState();
    // do some checking on name through the GameLobby
    if (this.gameLobby.isNameTaken(name)) {
      return Result.error('Name is taken');
    }
    const pokerTable = new PokerTable(name, this.generateId(), gameState, numSeats);
    this.gameLobby.addPokerTable(pokerTable);
    return Result.success();
  }
}