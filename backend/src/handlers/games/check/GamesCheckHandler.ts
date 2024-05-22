import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCheckPayload, GamesCheckOutput } from '@shared/api/gen/games/types/GamesCheck';

import { AbstractGamesCheckHandler } from './gen/AbstractGamesCheckHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class GamesCheckHandler extends AbstractGamesCheckHandler {
  protected async getResult(payload: GamesCheckPayload) {
    return new ResultSuccess<GamesCheckOutput>({ ok: true });
  }
}