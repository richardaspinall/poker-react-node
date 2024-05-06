import Joi from 'joi';

import { PokerTablesLeaveOutput, PokerTablesLeavePayload } from '../types/PokerTablesLeave';

export const PokerTablesLeavePayloadSchema = Joi.object<PokerTablesLeavePayload>({
  selectedSeatNumber: Joi.number().required(),
}).unknown(false);

export const PokerTablesLeaveOutputSchema = Joi.object<PokerTablesLeaveOutput>({
  ok: Joi.boolean().required(),
}).unknown(false);
