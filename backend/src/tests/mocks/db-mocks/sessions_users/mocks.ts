import { RowDataPacket } from 'mysql2/promise';

import { ResultSuccess } from '@infra/Result';

import { MySqLInstance } from '../../../../db/my-sql';

// import { DBInsertDuplicateError, DBInsertError } from '../../db/errors/DBInsertErrors';
// import { DBSelectError } from '../../db/errors/DBSelectErrors';

export const mockGetSessionIdByUsername = (userId: number, sessionId: string) => {
  jest
    .spyOn(MySqLInstance, 'select')
    .mockImplementation(
      async () => await new ResultSuccess([{ user_id: userId, session_id: sessionId }] as RowDataPacket[]),
    );
};
