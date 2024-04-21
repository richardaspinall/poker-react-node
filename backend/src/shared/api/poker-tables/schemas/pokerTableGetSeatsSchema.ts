import Joi from 'joi';

import { PokerTableGetSeatsPayload } from '../types/PokerTableGetSeats';

export const pokerTableGetSeatsSchema = Joi.object<PokerTableGetSeatsPayload>({
  pokerTableName: Joi.string().required(),
});
