import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersCallPayload, PlayersCallOutput } from '@shared/api/gen/players/types/PlayersCall';

import { AbstractPlayersCallHandler } from './gen/AbstractPlayersCallHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { NotActivePlayerError } from '../errors/gen/NotActivePlayerError';

export class PlayersCallHandler extends AbstractPlayersCallHandler {
  protected async getResult(payload: PlayersCallPayload) {
    return new ResultSuccess<PlayersCallOutput>({ ok: true});
  }
}