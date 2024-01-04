export type PlayerLeavePayload = {
    selectedSeatNumber: string;
    socketId: string;
  };
  
  export type PlayerLeaveOutput = {
    ok: boolean,
    error?: string
  };
  