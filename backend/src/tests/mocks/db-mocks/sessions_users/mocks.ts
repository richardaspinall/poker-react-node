import { RowDataPacket } from 'mysql2/promise';

import { ResultSuccess } from '@infra/Result';

import { MySqLInstance } from '../../../../db/my-sql';

// import { DBInsertDuplicateError, DBInsertError } from '../../db/errors/DBInsertErrors';
// import { DBSelectError } from '../../db/errors/DBSelectErrors';

export const mockGetSessionIdByUsername = (sessionId: string, username: string) => {
  jest
    .spyOn(MySqLInstance, 'select')
    .mockImplementation(
      async () => await new ResultSuccess([{ session_id: sessionId, username: username }] as RowDataPacket[]),
    );
};
