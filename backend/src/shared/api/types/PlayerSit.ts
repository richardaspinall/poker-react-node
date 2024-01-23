export type PlayerSitPayload = {
  selectedSeatNumber: string;
  socketId: string;
};

export type PlayerSitOutput = {
  ok: boolean;
  error?: string;
};
