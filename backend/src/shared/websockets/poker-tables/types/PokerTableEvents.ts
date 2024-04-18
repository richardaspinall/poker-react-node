export type PlayerJoinedEvent = {
  username: string;
  seatNumber: string;
};

export type PlayerLeftEvent = {
  username: string;
  seatNumber: string;
};

export interface PokerTableEvents {
  player_joined: (payload: PlayerJoinedEvent) => void;
  player_left: (payload: PlayerLeftEvent) => void;
}
