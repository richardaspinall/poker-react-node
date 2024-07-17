import { ResultError, ResultSuccess } from '@infra/Result';
import { GamesGetGameStateOutput, GamesGetGameStatePayload } from '@shared/api/gen/games/types/GamesGetGameState';

import { GameLobbyService } from '../../../game-lobby-service';
import { Dealer } from '../../../game/Dealer';
import { GameStateDoesNotExistError } from '../errors/gen/GameStateDoesNotExistError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';
import { AbstractGamesGetGameStateHandler } from './gen/AbstractGamesGetGameStateHandler';

export class GamesGetGameStateHandler extends AbstractGamesGetGameStateHandler {
  protected async getResult(payload: GamesGetGameStatePayload, userId: number) {
    const pokerTable = GameLobbyService.getPokerTable(payload.pokerTableName);
    if (!pokerTable) {
      return new ResultError(new PokerTableDoesNotExistError());
    }

    const gameState = pokerTable.getGame()?.getGameState().toJson();

    if (!gameState) {
      return new ResultError(new GameStateDoesNotExistError());
    }

    // TODO: perhaps in future we have own endpoint and make the getGameStateHandler not authentication needed
    const playersHoleCards = Dealer.getPlayersHoleCards(pokerTable, userId);

    const playersCurrentBets = Dealer.getPlayersCurrentBets(pokerTable);

    const resp = {
      ok: true,
      payload: {
        ...gameState,
        playersHoleCards: playersHoleCards,
        playersCurrentBets: playersCurrentBets,
      },
    };

    return new ResultSuccess<GamesGetGameStateOutput>(resp);
  }
}
