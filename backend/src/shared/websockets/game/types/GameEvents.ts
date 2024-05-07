export enum GameEvent {
  START_GAME = 'start_game',
}

export type StartGameEvent = {
  tableName: string;
};

export interface GameEvents {
  start_game: (payload: StartGameEvent) => void;
}
