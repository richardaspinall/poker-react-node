export type PlayerJoinedEvent = {
  username: string;
  seatNumber: number;
};

export type PlayerLeftEvent = {
  username: string;
  seatNumber: number;
};

export interface PokerTableEvents {
  player_joined: (payload: PlayerJoinedEvent) => void;
  player_left: (payload: PlayerLeftEvent) => void;
}
