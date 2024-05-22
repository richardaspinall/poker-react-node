import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesCallPayload, GamesCallOutput } from '@shared/api/gen/games/types/GamesCall';

import { AbstractGamesCallHandler } from './gen/AbstractGamesCallHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class GamesCallHandler extends AbstractGamesCallHandler {
  protected async getResult(payload: GamesCallPayload) {
    return new ResultSuccess<GamesCallOutput>({ ok: true });
  }
}