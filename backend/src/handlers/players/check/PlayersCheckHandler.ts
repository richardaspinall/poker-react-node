import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersCheckPayload, PlayersCheckOutput } from '@shared/api/gen/players/types/PlayersCheck';

import { AbstractPlayersCheckHandler } from './gen/AbstractPlayersCheckHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class PlayersCheckHandler extends AbstractPlayersCheckHandler {
  protected async getResult(payload: PlayersCheckPayload) {
    return new ResultSuccess<PlayersCheckOutput>({ ok: true });
  }
}