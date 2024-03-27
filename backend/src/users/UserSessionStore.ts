import { User } from './User';

interface SessionUser {
  sessionId: string;
  username?: string;
  authenticated?: boolean;
}

export class UserSessionStore {
  private static sessions: Map<string, SessionUser>;

  static initialize(): void {
    UserSessionStore.sessions = new Map<string, SessionUser>();
  }

  static addSession(sessionId: string): void {
    UserSessionStore.sessions.set(sessionId, { sessionId });
  }

  static addUserSession(sessionId: string, username: string): void {
    UserSessionStore.sessions.set(sessionId, { sessionId, username, authenticated: true });
  }

  static getUserSession(sessionId: string): SessionUser | undefined {
    return UserSessionStore.sessions.get(sessionId);
  }

  static getAllSessions(): Map<string, SessionUser> {
    return UserSessionStore.sessions;
  }

  static removeUserSession(sessionId: string): void {
    UserSessionStore.sessions.delete(sessionId);
  }
}
