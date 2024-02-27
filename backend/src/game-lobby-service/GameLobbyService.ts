// Internal
import { GameLobby } from './game-lobby/GameLobby';
import { PokerTable } from '../game/PokerTable';
import { Result } from '@shared/Result';
import{ Rooms } from '../sockets/Rooms';
import { Logger } from '../utils/Logger';

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
      return Result.error('name_taken');
    }

    const room = Rooms.createRoom(name);
    if (!room.ok) {
      return Result.error('create_room_error');
    }
    const roomId = room.getValue();
    const pokerTable = PokerTable.createPokerTable(name, numSeats, roomId).getValue();
    this.gameLobby.addTable(pokerTable);

    return Result.success();
  }

  public getTable(name: string): PokerTable | undefined {
    const tables = this.gameLobby.getTables();
    return tables[name];
  }
}
