import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesBetPayload, GamesBetOutput } from '@shared/api/gen/games/types/GamesBet';

import { AbstractGamesBetHandler } from './gen/AbstractGamesBetHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class GamesBetHandler extends AbstractGamesBetHandler {
  protected async getResult(payload: GamesBetPayload) {
    return new ResultSuccess<GamesBetOutput>({ ok: true });
  }
}