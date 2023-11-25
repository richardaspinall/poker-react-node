import SocketServer from './SocketServer';
import Result, { ResultSuccess, ResultError } from '../shared/Result';
import Sockets, { ClientId } from './Sockets';

export type RoomId = string;

export default class Rooms {
  // The second string might be removed later (and a set used instead)
  private static roomMap = new Map<RoomId, string>();

  public static sendEventToRoom(roomId: RoomId, event: string, payload: any): Result<void> {
    const roomRes = this.getRoom(roomId);

    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }

    const room = roomRes.getValue();

    SocketServer.sendEventToRoom(room, event, payload);
    return Result.success();
  }

  private static createRoom(roomId: RoomId): Result<RoomId> {
    if (!this.roomMap.has(roomId)) {
      this.roomMap.set(roomId, roomId);
      return new ResultSuccess(roomId);
    }
    return new ResultError('Room already exists');
  }

  private static deleteRoom(roomId: RoomId): Result<void> {
    const res = this.roomMap.delete(roomId);

    if (res) {
      return Result.success();
    }
    return Result.error('Room not found');
  }

  private static getRoom(roomId: RoomId): Result<RoomId> {
    if (this.roomMap.has(roomId)) {
      return new ResultSuccess(roomId);
    }
    return new ResultError('Room not found');
  }

  private static joinRoom(clientId: ClientId, roomId: RoomId): Result<void> {
    const socketRes = Sockets.getSocket(clientId);
    const roomRes = this.getRoom(roomId);

    if (socketRes.isError) {
      return Result.error(socketRes.errorMessage);
    }

    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }

    const socket = socketRes.getValue();
    const room = roomRes.getValue();

    socket.join(room);
    return Result.success();
  }

  private static leaveRoom(clientId: ClientId, roomId: RoomId): Result<void> {
    const socketRes = Sockets.getSocket(clientId);
    const roomRes = this.getRoom(roomId);

    if (socketRes.isError) {
      return Result.error(socketRes.errorMessage);
    }

    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }

    const socket = socketRes.getValue();
    const room = roomRes.getValue();

    socket.leave(room);
    return Result.success();
  }
}
