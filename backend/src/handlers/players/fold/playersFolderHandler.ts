import { ResultError, ResultSuccess } from '@infra/Result';
import { PlayersFoldPayload, PlayersFoldOutput } from '@shared/api/gen/players/types/PlayersFold';

import { AbstractPlayersFoldHandler } from './gen/AbstractPlayersFoldHandler';

import { PlayerNotFoundAtTableError } from '../errors/gen/PlayerNotFoundAtTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { PlayerAlreadyFolded } from '../errors/gen/PlayerAlreadyFolded';

export class PlayersFoldHandler extends AbstractPlayersFoldHandler {
  protected async getResult(payload: PlayersFoldPayload) {
    return new ResultSuccess<PlayersFoldOutput>({ ok: true});
  }
}