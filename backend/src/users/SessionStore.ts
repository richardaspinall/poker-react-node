import session from 'express-session';

import { MySqLInstance as DB } from '../db/my-sql';

export class SessionStore extends session.Store {
  constructor() {
    super();
  }

  public async get(sid: string, callback: (err: any, session?: session.Session | null) => void): Promise<void> {
    const res = await DB.select('sessions', ['session_id'], [sid]);
    if (res.isError()) {
      console.log(res.getError());
      callback(res.getError());
      return;
    }
    const rows = res.getValue();
    const session = rows.length > 0 ? JSON.parse(rows[0].session_data as string) : null;
    callback(null, session);
  }

  public async set(sid: string, session: session.Session, callback: (err?: any) => void): Promise<void> {
    // It's essential to ensure session is serializable
    const sessionData = JSON.stringify(session);
    const res = await DB.insert('sessions', ['session_id', 'session_data'], [sid, sessionData]);

    if (res.isError()) {
      callback(res.getError());
      if (res.getError().code === 'ER_DUP_ENTRY') {
        const updateRes = await DB.update('sessions', ['session_data'], [sessionData], ['session_id'], [sid]);

        if (updateRes.isError()) {
          callback(updateRes.getError());
          return;
        }
        callback();
        return;
      }
      return;
    }

    callback();
  }

  public async destroy(sid: string, callback: (err?: any) => void): Promise<void> {
    const res = await DB.delete('sessions', ['session_id'], [sid]);
    if (res.isError()) {
      callback(res.getError());
      return;
    }
    callback();
  }
}
