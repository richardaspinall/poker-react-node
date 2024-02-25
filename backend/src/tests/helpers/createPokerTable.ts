import { GameLobbyService } from '../../game-lobby-service/GameLobbyService';
import { PokerTable } from '../../game/PokerTable';
import { mockCreateRoomSuccess } from '../mocks/roomMocks';

export function createPokerTable(tableName: string, numberOfSeats: number): PokerTable {
  mockCreateRoomSuccess(tableName);
  const gameLobbyService = new GameLobbyService();

  let pokerTable: PokerTable = {} as PokerTable;

  try {
    const res = gameLobbyService.createPokerTable(tableName, numberOfSeats);
    if (res.isError) {
      throw new Error(res.errorMessage);
    }

    const getTableRes = gameLobbyService.getTable(tableName);

    if (!getTableRes) {
      throw new Error('Poker table not found');
    }

    pokerTable = getTableRes;
  } catch (err) {
    console.log(err);
  }

  return pokerTable;
}
