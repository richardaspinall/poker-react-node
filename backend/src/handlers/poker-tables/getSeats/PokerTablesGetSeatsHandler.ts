import { ResultError, ResultSuccess } from '@infra/Result';
import {
  PokerTablesGetSeatsOutput,
  PokerTablesGetSeatsPayload,
} from '@shared/api/gen/poker-tables/types/PokerTablesGetSeats';

import { GameLobbyService } from '../../../game-lobby-service';
import { AbstractPokerTablesGetSeatsHandler } from './gen/AbstractPokerTablesGetSeatsHandler';
import { PokerTableDoesNotExistError } from './gen/errors/PokerTableDoesNotExistError';

class PokerTablesGetSeatsHandler extends AbstractPokerTablesGetSeatsHandler {
  protected async getResult(payload: PokerTablesGetSeatsPayload) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const seats = pokerTable.getSeats();

    const filteredSeats = seats.map((seat) => ({
      seatNumber: seat.seatNumber,
      username: seat.username,
    }));

    return new ResultSuccess<PokerTablesGetSeatsOutput>({ ok: true, seats: filteredSeats });
  }
}

export { PokerTablesGetSeatsHandler };
