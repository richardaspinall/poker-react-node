/* 
!!!! Copy out the below for new or updated API

import { ResultError, ResultSuccess } from '@infra/Result';
import { PokerTablesLeavePayload, } from '@shared/api/poker-tables/types/PokerTablesLeave';

import { AbstractPokerTablesLeaveHandler } from './gen/AbstractPokerTablesLeaveHandler';

import {PlayerNotFoundAtTableError} from './gen/errors/PlayerNotFoundAtTableError'

import {PokerTableDoesNotExistError} from './gen/errors/PokerTableDoesNotExistError'


export class PokerTablesLeaveHandler extends AbstractPokerTablesLeaveHandler {
  protected async getResult(payload: PokerTablesLeavePayload) {
    return new ResultSuccess();
  }
}
*/
import {
  PokerTablesLeaveOutputSchema,
  PokerTablesLeavePayloadSchema,
} from '@shared/api/poker-tables/schemas/PokerTablesLeaveSchemas';
import {
  PokerTablesLeaveErrorCodes,
  PokerTablesLeaveOutput,
  PokerTablesLeavePayload,
} from '@shared/api/poker-tables/types/PokerTablesLeave';

import { BaseHandler } from '../../BaseHandler';

export abstract class AbstractPokerTablesLeaveHandler extends BaseHandler<
  PokerTablesLeavePayload,
  PokerTablesLeaveOutput
> {
  constructor() {
    super(PokerTablesLeavePayloadSchema, PokerTablesLeaveOutputSchema, PokerTablesLeaveErrorCodes);
  }
}
