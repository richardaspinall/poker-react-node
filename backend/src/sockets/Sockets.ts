// external modules
import { Socket } from 'socket.io';

// internal modules
import SocketServer from './SocketServer';
import Rooms from './Rooms';
import SocketHandlers from './SocketEventHandlers';

// types
import Result, { ResultSuccess, ResultError } from '../shared/Result';
export type ClientId = string;

export default class Sockets {
  // For now the socket map is just a map of client id to socket id but we will change this later
  //
  // We would save a reference of the socket.id in the player object to look it up. And then when we get to
  // sessions, we will change this to a new id that we generate
  private static socketMap = new Map<ClientId, Socket>();

  public static setUpSocket(socket: Socket) {
    Sockets.addSocket(socket.id, socket);
    SocketHandlers.setUpHandlers(socket);
  }

  public static sendEventToClient(clientId: ClientId, event: string, payload: any): Result<void> {
    const res = Sockets.getSocket(clientId);

    if (res.isError) {
      return Result.error(res.errorMessage);
    }

    const socket = res.getValue();

    SocketServer.sendEventToClient(socket, event, payload);

    return Result.success();
  }

  public static getSocket(clientId: ClientId): Result<Socket> {
    const socket = Sockets.socketMap.get(clientId);

    if (socket) {
      return new ResultSuccess(socket);
    }

    return new ResultError('Socket not found');
  }

  private static addSocket(clientId: ClientId, clientSocket: Socket) {
    Sockets.socketMap.set(clientId, clientSocket);

    // hardcoding joinging room 1 for now this will be the same as the
    // table name
    const createRoomRes = Rooms.createRoom('room-1');

    if (createRoomRes.isError) {
      console.log(createRoomRes.errorMessage);
      return;
    }

    const joinRoomRes = Rooms.joinRoom('room-1', clientSocket);
    if (joinRoomRes.isError) {
      console.log(joinRoomRes.errorMessage);
      return;
    }

    const sendEventRes = Rooms.sendEventToRoom('room-1', 'hello_from_server', { clientId: clientId });
    if (sendEventRes.isError) {
      console.log(sendEventRes.errorMessage);
      return;
    }
  }

  private static removeSocket(clientId: ClientId) {
    Sockets.socketMap.delete(clientId);
  }
}
