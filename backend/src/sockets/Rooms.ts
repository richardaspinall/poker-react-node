// external modules
import { Socket } from 'socket.io';

// internal modules
import SocketServer from './SocketServer';

// types
import Result, { ResultSuccess, ResultError } from '../shared/Result';
export type RoomId = string;

export default class Rooms {
  private static roomSet = new Set<RoomId>();

  public static createRoom(roomId: RoomId): Result<void> {
    if (!Rooms.roomSet.has(roomId)) {
      Rooms.roomSet.add(roomId);
      return Result.success();
    }
    return Result.error('Room already exists');
  }

  public static joinRoom(roomId: RoomId, socket: Socket): Result<void> {
    const res = Rooms.getRoom(roomId);

    if (res.isError) {
      return Result.error(res.errorMessage);
    }

    const room = res.getValue();
    socket.join(room);

    return Result.success();
  }

  public static sendEventToRoom(roomId: RoomId, event: string, payload: any): Result<void> {
    const res = Rooms.getRoom(roomId);

    if (res.isError) {
      return Result.error(res.errorMessage);
    }

    const room = res.getValue();
    SocketServer.sendEventToRoom(room, event, payload);

    return Result.success();
  }

  private static getRoom(roomId: RoomId): Result<RoomId> {
    if (!Rooms.roomSet.has(roomId)) {
      return new ResultError('Room not found');
    }
    return new ResultSuccess(roomId);
  }

  private static leaveRoom(roomId: RoomId, socket: Socket): Result<void> {
    const res = this.getRoom(roomId);
    if (res.isError) {
      return Result.error(res.errorMessage);
    }

    const room = res.getValue();
    socket.leave(room);

    return Result.success();
  }

  private static deleteRoom(roomId: RoomId): Result<void> {
    const res = Rooms.roomSet.delete(roomId);

    if (!res) {
      return Result.error('Room not found');
    }
    return Result.success();
  }
}
