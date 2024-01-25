import { mockSendEventToRoomSuccess } from '../../handlers/actions/roomMocks';
import createPokerTable from './createPokerTable';

export default function createPokerTableWithPlayers(tableName: string, numberOfSeats: number) {
  mockSendEventToRoomSuccess();
  const pokerTable = createPokerTable(tableName, numberOfSeats);

  for (let i = 0; i < numberOfSeats; i++) {
    const seatNumber = i + 1;
    const res = pokerTable.sitAtTable(tableName, 'seat-' + seatNumber, 'a' + seatNumber);

    if (res.isError) {
      throw new Error(res.errorMessage);
    }
  }
  return pokerTable;
}
