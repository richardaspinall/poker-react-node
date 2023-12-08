export type TableJoinPayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export type TableJoinResult = {
  seatNumber: string;
  socketId: string;
  error?: string;
};
