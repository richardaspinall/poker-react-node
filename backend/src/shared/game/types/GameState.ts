import { GamesGetGameStateOutput } from '@shared/api/gen/games/types/GamesGetGameState';

export type GameState = Omit<GamesGetGameStateOutput, 'ok'>;
