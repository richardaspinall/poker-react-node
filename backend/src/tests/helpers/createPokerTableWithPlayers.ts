import { createPokerTable } from '@tests/helpers/createPokerTable';
import { mockGetSessionIdByUsername } from '@tests/mocks/db-mocks/sessions_users/mocks';
import { mockSendEventToRoomSuccess } from '@tests/mocks/roomMocks';

import { Player } from '../../game/Player';

export function createPokerTableWithPlayers(tableName: string, numberOfSeats: number) {
  mockSendEventToRoomSuccess();
  mockGetSessionIdByUsername('session-1', 'a1');
  const pokerTable = createPokerTable(tableName, numberOfSeats);
  const players: Player[] = [];

  for (let i = 0; i < numberOfSeats; i++) {
    const seatNumber = i + 1;
    const user = new Player(1234 + seatNumber, 'a' + seatNumber);

    players.push(user);
    const res = pokerTable.addPlayer('seat-' + seatNumber, user);

    if (res.isError()) {
      throw new Error(res.getError().message);
    }
  }
  return { pokerTable, players };
}
