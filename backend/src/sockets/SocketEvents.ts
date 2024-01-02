export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}

export interface ServerToClientEvents {
  hello_from_server: () => void;
  player_joined: (payload:any) => void;
  start_game: (payload:any) => void;
}