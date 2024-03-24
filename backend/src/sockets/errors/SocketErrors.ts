import { BaseError } from '@infra/BaseError';

export class SocketNotFoundError extends BaseError {
  constructor() {
    super('socket_not_found', 'Socket not found');
  }
}
