export type PokerTableGetStatePayload = {
  tableName: string;
};

export type PokerTableState = {
  tableName: string;
  seats: {
    [key: string]: {
      player: {
        name: string;
        stack: number;
        seatNumber: number;
      };
    };
  };
  board?: String[] | null;
  pot?: number;
  dealer?: string;
  smallBlind?: number;
  bigBlind?: number;
  currentTurn?: string; // seat-id
  currentBet?: number;
  lastRaise?: number;
  lastRaiseAmount?: number;
  lastRaisePlayer?: number;
  lastRaiseTotal?: number;
};

export type PokerTableGetStateOutput = {
  ok: boolean;
  error?: string;
  state: PokerTableState;
};
