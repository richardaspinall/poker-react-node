import { User } from './User';

interface SessionUser {
  sessionId: string;
  user: User;
}

export class UserStore {
  private sessions: Map<string, SessionUser>;

  constructor() {
    this.sessions = new Map<string, SessionUser>();
  }

  addUserSession(sessionId: string, user: User): void {
    this.sessions.set(sessionId, { sessionId, user });
  }

  getUserSession(sessionId: string): SessionUser | undefined {
    return this.sessions.get(sessionId);
  }

  removeUserSession(sessionId: string): void {
    this.sessions.delete(sessionId);
  }
}
