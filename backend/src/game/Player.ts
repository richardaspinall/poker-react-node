import { User } from '../users/User';

export class Player extends User {
  constructor(username: string, userId: number) {
    super(username, userId);
  }
}
