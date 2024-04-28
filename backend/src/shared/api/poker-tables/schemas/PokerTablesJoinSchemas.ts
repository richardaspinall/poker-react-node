import Joi from 'joi';

import { PokerTablesJoinOutput, PokerTablesJoinPayload } from '../types/PokerTablesJoin';

export const PokerTablesJoinPayloadSchema = Joi.object<PokerTablesJoinPayload>({
  selectedSeatNumber: Joi.string().required(),
}).unknown(false);

export const PokerTablesJoinOutputSchema = Joi.object<PokerTablesJoinOutput>({ ok: Joi.boolean().required() }).unknown(
  false,
);
