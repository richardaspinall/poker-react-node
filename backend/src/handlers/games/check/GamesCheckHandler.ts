import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCheckOutput, GamesCheckPayload } from '@shared/api/gen/games/types/GamesCheck';

import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';
import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesCheckHandler } from './gen/AbstractGamesCheckHandler';

export class GamesCheckHandler extends AbstractGamesCheckHandler {
  protected async getResult(payload: GamesCheckPayload) {
    return new ResultSuccess<GamesCheckOutput>({ ok: true });
  }
}
