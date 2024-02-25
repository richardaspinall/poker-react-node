// external modules
import { Socket } from 'socket.io';

// internal modules
import { SocketServer } from './SocketServer';
import { Sockets, ClientId } from './Sockets';

import { Logger } from '../utils/Logger';

// types
import { Result, ResultSuccess, ResultError } from '../shared/Result';
export type RoomId = string;

export class Rooms {
  // The second string might be removed later (and a set used instead)
  private static roomMap = new Map<RoomId, string>();

  public static createRoom(roomId: RoomId): Result<RoomId> {
    if (!this.roomMap.has(roomId)) {
      this.roomMap.set(roomId, roomId);
      return new ResultSuccess(roomId);
    }
    return new ResultError('Room already exists');
  }

  public static joinRoom(roomId: RoomId, socket: Socket): Result<void> {
    const roomRes = this.getRoom(roomId);
    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }
    const room = roomRes.getValue();
    socket.join(room);
    return Result.success();
  }

  public static sendEventToRoom(roomId: RoomId, event: string, payload: any): Result<void> {
    const roomRes = this.getRoom(roomId);
    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }
    const room = roomRes.getValue();
    SocketServer.sendEventToRoom(room, event, payload);
    return Result.success();
  }

  public static getRoom(roomId: RoomId): Result<RoomId> {
    if (this.roomMap.has(roomId)) {
      return new ResultSuccess(roomId);
    }
    return new ResultError('Room not found');
  }

  private static leaveRoom(roomId: RoomId, socket: Socket): Result<void> {
    const roomRes = this.getRoom(roomId);

    if (roomRes.isError) {
      return Result.error(roomRes.errorMessage);
    }

    const room = roomRes.getValue();

    socket.leave(room);
    return Result.success();
  }

  private static deleteRoom(roomId: RoomId): Result<void> {
    const res = this.roomMap.delete(roomId);

    if (res) {
      return Result.success();
    }
    return Result.error('Room not found');
  }
}
