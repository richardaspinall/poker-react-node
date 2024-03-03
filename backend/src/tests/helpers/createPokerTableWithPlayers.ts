// Internal
import { mockSendEventToRoomSuccess } from '@tests/mocks/roomMocks';
import { createPokerTable } from '@tests/helpers/createPokerTable';

export function createPokerTableWithPlayers(tableName: string, numberOfSeats: number) {
  mockSendEventToRoomSuccess();
  const pokerTable = createPokerTable(tableName, numberOfSeats);
  const playerNames: string[] = [];

  for (let i = 0; i < numberOfSeats; i++) {
    const seatNumber = i + 1;
    playerNames.push('a' + seatNumber);
    const res = pokerTable.sitAtTable('seat-' + seatNumber, 'a' + seatNumber);

    if (res.isError) {
      throw new Error(res.errorMessage);
    }
  }
  return { pokerTable, playerNames };
}
