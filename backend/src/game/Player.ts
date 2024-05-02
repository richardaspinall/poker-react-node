import { User } from '../users/User';

export class Player extends User {
  constructor(userId: number, username: string) {
    super(userId, username);
  }
}
