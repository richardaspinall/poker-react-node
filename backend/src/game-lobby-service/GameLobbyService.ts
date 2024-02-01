// internal modules
import GameLobby from './game-lobby/GameLobby';
import PokerTable from '../game/PokerTable';
import Result from '../shared/Result';
import Logger from '../utils/Logger';

const debug = Logger.newDebugger('APP:GameLobbyService');

export default class GameLobbyService {
  private gameLobby: GameLobby;

  constructor() {
    this.gameLobby = new GameLobby();
  }

  public createPokerTable(name: string, numSeats: number): Result<void> {
    // do some checking on name through the GameLobby
    if (this.gameLobby.isNameTaken(name)) {
      return Result.error('name_taken');
    }

    const res = PokerTable.createPokerTable(name, numSeats);
    if (res.isError) {
      debug(res.errorMessage);
      return Result.error(res.errorMessage);
    }
    const pokerTable = res.getValue();

    this.gameLobby.addTable(pokerTable);

    return Result.success();
  }

  public getTable(name: string): PokerTable | undefined {
    return this.gameLobby.getTables().find((table) => table.getName() === name);
  }
}
