// Can't use @shared alias here if exporting to different project like the frontend
import { playerJoinedEvent, playerLeftEvent } from './poker-tables/types/PokerTableEvents';

// TODO: nothing regarding the domain should be here
export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}

export interface ServerToClientEvents {
  hello_from_server: () => void;
  player_joined: (payload: playerJoinedEvent) => void;
  player_left: (payload: playerLeftEvent) => void;
  start_game: (payload: any) => void;
}

export type ServerToClientEventParams<T extends keyof ServerToClientEvents> = Parameters<ServerToClientEvents[T]>[0];
