import { ResultError, ResultSuccess } from '@infra/Result';
import {
  PokerTableGetSeatsOutputSchema,
  PokerTableGetSeatsPayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTableGetSeatsSchema';
import {
  PokerTableGetSeatsErrorCodes,
  PokerTableGetSeatsOutput,
  PokerTableGetSeatsPayload,
} from '@shared/api/poker-tables/types/PokerTableGetSeats';

import { GameLobbyService } from '../../game-lobby-service';
import { BaseHandler } from '../BaseHandler';
import { PokerTableDoesNotExistError } from './errors/PokerTableDoesNotExistError';

export class PokerTablesGetSeatsHandler extends BaseHandler<PokerTableGetSeatsPayload, PokerTableGetSeatsOutput> {
  constructor() {
    super(PokerTableGetSeatsPayloadSchema, PokerTableGetSeatsOutputSchema, PokerTableGetSeatsErrorCodes, false);
  }

  protected async getResult(payload: PokerTableGetSeatsPayload) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const seats = pokerTable.getSeats();

    return new ResultSuccess({ ok: true, seats });
  }
}
