export type playerJoinedEvent = {
  username: string;
  seatNumber: string;
};

export type playerLeftEvent = {
  username: string;
  seatNumber: string;
};

export interface PokerTableEvents {
  player_joined: (payload: playerJoinedEvent) => void;
  player_left: (payload: playerLeftEvent) => void;
}
