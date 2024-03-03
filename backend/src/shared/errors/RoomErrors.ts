import { BaseError } from '@shared/Result';

export class RoomAlreadyExistsError extends BaseError {
  constructor() {
    super('ROOM_ALREADY_EXISTS', 'Room already exists');
  }
}

export class RoomNotFoundError extends BaseError {
  constructor(id: string) {
    super('ROOM_NOT_FOUND', `Room ${id} could not be found`);
  }
}

export class RoomCreationError extends BaseError {
  constructor() {
    super('ROOM_CREATION_ERROR', `Room was not created`);
  }
}
