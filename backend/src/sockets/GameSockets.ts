import { Socket } from 'socket.io';

// These are all the event types that can be passed between the client and the server
export interface ClientToServerEvents {
  hello_from_client: (value: string, callback: (statusCode: number) => void) => void;
}

export interface ServerToClientEvents {
  hello_from_server: () => void;
}

export default class GameSockets {
  // For now the socket map is just a map of client id to socket id but we will change this later
  //
  // TODO: This should be `socket.id socket` (<string, Socket>)so we can send messages to specific clients
  //
  // We would then save a reference of the socket.id in the player object to look it up. And then when we
  // sessions, we might change this to a new id that we generate
  private static socketMap = new Map<string, string>();

  // This is where we route all the events from the client to the server
  public static setupSocket(socket: Socket) {
    GameSockets.addSocket(socket.id, socket.id);

    console.log(GameSockets.socketMap);

    socket.on('disconnect', (reason: string) => {
      console.log('disconnected');

      GameSockets.removeSocket(socket.id);

      console.log(GameSockets.socketMap);
    });
  }

  private static addSocket(clientId: string, clientSocket: string) {
    this.socketMap.set(clientId, clientSocket);
  }

  private static getSocket(clientId: string) {
    return this.socketMap.get(clientId);
  }

  private static removeSocket(clientId: string) {
    this.socketMap.delete(clientId);
  }

  // We will create public methods for the server to call to send events to the client
}
