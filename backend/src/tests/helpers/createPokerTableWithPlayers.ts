import { createPokerTable } from '@tests/helpers/createPokerTable';
import { mockSendEventToRoomSuccess } from '@tests/mocks/roomMocks';
import { mockMySqlSelectSessionSuccess } from '@tests/mocks/sessionMocks';

import { Player } from '../../game/Player';

export function createPokerTableWithPlayers(tableName: string, numberOfSeats: number) {
  mockSendEventToRoomSuccess();
  const pokerTable = createPokerTable(tableName, numberOfSeats);
  const players: Player[] = [];

  for (let i = 0; i < numberOfSeats; i++) {
    const seatNumber = i + 1;
    const user = new Player(1234 + seatNumber, 'a' + seatNumber);

    players.push(user);
    mockMySqlSelectSessionSuccess(user.getUserName());
    const res = pokerTable.addPlayer(seatNumber, user);

    if (res.isError()) {
      throw new Error(res.getError().message);
    }
  }
  return { pokerTable, players };
}
