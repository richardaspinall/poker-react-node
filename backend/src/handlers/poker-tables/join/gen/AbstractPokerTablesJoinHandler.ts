/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesJoinPayload, PokerTablesJoinOutput } from '@shared/api/gen/poker-tables/types/PokerTablesJoin';

import { AbstractPokerTablesJoinHandler } from './gen/AbstractPokerTablesJoinHandler';

import { SeatTakenError } from '../errors/gen/SeatTakenError';
import { PlayerAlreadySeatedError } from '../errors/gen/PlayerAlreadySeatedError';
import { PlayerNotFoundAtPokerTableError } from '../errors/gen/PlayerNotFoundAtPokerTableError';
import { PokerTableDoesNotExistError } from '../errors/gen/PokerTableDoesNotExistError';

export class PokerTablesJoinHandler extends AbstractPokerTablesJoinHandler {
  protected async getResult(payload: PokerTablesJoinPayload) {
    return new ResultSuccess<PokerTablesJoinOutput>();
  }
}
*/
import {
  PokerTablesJoinOutputSchema,
  PokerTablesJoinPayloadSchema,
} from '@shared/api/gen/poker-tables/schemas/PokerTablesJoinSchemas';
import {
  PokerTablesJoinErrorCodes,
  PokerTablesJoinOutput,
  PokerTablesJoinPayload,
} from '@shared/api/gen/poker-tables/types/PokerTablesJoin';

import { BaseHandler } from '../../../BaseHandler';

export abstract class AbstractPokerTablesJoinHandler extends BaseHandler<
  PokerTablesJoinPayload,
  PokerTablesJoinOutput
> {
  constructor() {
    super(PokerTablesJoinPayloadSchema, PokerTablesJoinOutputSchema, PokerTablesJoinErrorCodes);
  }
}
