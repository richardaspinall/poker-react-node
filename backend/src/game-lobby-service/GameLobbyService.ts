// Internal
import { GameLobby } from './game-lobby/GameLobby';
import { PokerTable } from '../game/PokerTable';
import { Rooms } from '../sockets/Rooms';
import { Result, ResultError } from '@shared/Result';
import { Logger } from '../utils/Logger';
import { PokerTableNameTakenError } from '@shared/errors/GameLobbyServiceErrors';
import { RoomNotCreatedError } from '@shared/errors/RoomErrors';

const debug = Logger.newDebugger('APP:GameLobbyService');

/**
 * GameLobbyService is responsible for creating and managing poker tables
 */
export class GameLobbyService {
  private gameLobby: GameLobby;

  constructor() {
    this.gameLobby = new GameLobby();
  }

  public createPokerTable(name: string, numSeats: number): Result<void> {
    // do some checking on name through the GameLobby
    if (this.gameLobby.isNameTaken(name)) {
      return Result.error(new PokerTableNameTakenError());
    }

    const room = Rooms.createRoom(name);
    if (room.isError()) {
      return new ResultError(new RoomNotCreatedError());
    }
    const res = PokerTable.createPokerTable(name, numSeats);
    if (res.isError()) {
      debug(res.getError().message);
      return Result.error(res.getError());
    }
    const pokerTable = res.getValue();

    this.gameLobby.addTable(pokerTable);

    return Result.success();
  }

  public getTable(name: string): PokerTable | undefined {
    const tables = this.gameLobby.getTables();
    return tables[name];
  }
}
