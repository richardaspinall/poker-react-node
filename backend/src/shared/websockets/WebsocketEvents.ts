import { GameEvents } from './game/types/GameEvents';
import { PokerTableEvents } from './poker-tables/types/PokerTableEvents';

export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}
export interface ServerToClientEvents extends PokerTableEvents, GameEvents {
  hello_from_server: () => void;
}
export type ServerToClientEventParams<T extends keyof ServerToClientEvents> = Parameters<ServerToClientEvents[T]>[0];
