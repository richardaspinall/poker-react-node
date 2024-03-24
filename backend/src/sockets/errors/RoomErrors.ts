import { BaseError } from '@infra/BaseError';

export class RoomAlreadyExistsError extends BaseError {
  constructor() {
    super('room_already_exists', 'Room already exists');
  }
}

export class RoomNotFoundError extends BaseError {
  constructor(id: string) {
    super('room_not_found', `Room ${id} could not be found`);
  }
}

export class RoomNotCreatedError extends BaseError {
  constructor() {
    super('room_not_created', `Room could not be created`);
  }
}
