import { PokerTableEvents } from './poker-tables/types/PokerTableEvents';

export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}
export interface ServerToClientEvents extends PokerTableEvents {
  hello_from_server: () => void;
  start_game: (payload: any) => void; // to remove
}
export type ServerToClientEventParams<T extends keyof ServerToClientEvents> = Parameters<ServerToClientEvents[T]>[0];
