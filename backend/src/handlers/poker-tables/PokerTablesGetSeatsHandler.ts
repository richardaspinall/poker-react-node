import type { Response } from 'express';

import { pokerTableGetSeatsSchema } from '@shared/api/poker-tables/schemas/pokerTableGetSeatsSchema';
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
    super(pokerTableGetSeatsSchema, PokerTableGetSeatsErrorCodes, false);
  }

  protected getResult(payload: PokerTableGetSeatsPayload, res: Response<PokerTableGetSeatsOutput>) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return this.handleError(new PokerTableDoesNotExistError(), res);
    }

    // TODO: Can we stop isTaken from being passed back?
    const seats = pokerTable.getSeats();

    return res.send({ ok: true, seats });
  }
}
