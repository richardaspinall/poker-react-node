// These are all the event types that can be passed between the client and the server
export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}

export interface ServerToClientEvents {
  hello_from_server: () => void;
}
