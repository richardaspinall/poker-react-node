export type TableCreatePayload = {
  name: string;
  numSeats: number;
};

export type TableCreateResult = {
  ok: boolean;
  error?: string;
};
