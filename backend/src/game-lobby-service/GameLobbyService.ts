import { Result, ResultError } from '@infra/Result';

import { PokerTable } from '../game/PokerTable';
import { PokerTableNameTakenError } from '../handlers/poker-tables/errors/PokerTableNameTakenError';
import { Rooms } from '../sockets/Rooms';
import { RoomNotCreatedError } from '../sockets/errors/RoomErrors';
import { Logger } from '../utils/Logger';
import { GameLobby } from './game-lobby/GameLobby';

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

    this.gameLobby.addPokerTable(pokerTable);

    return Result.success();
  }

  public getPokerTable(name: string): PokerTable | undefined {
    const pokerTables = this.gameLobby.getPokerTables();
    return pokerTables[name];
  }
}
