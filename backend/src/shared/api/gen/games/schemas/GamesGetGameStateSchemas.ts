import Joi from 'joi';

import { GamesGetGameStateOutput, GamesGetGameStatePayload } from '../types/GamesGetGameState';

export const GamesGetGameStatePayloadSchema = Joi.object<GamesGetGameStatePayload>({
  pokerTableName: Joi.string().required(),
}).unknown(false);

export const GamesGetGameStateOutputSchema = Joi.object<GamesGetGameStateOutput>({
  ok: Joi.boolean().required(),
  payload: Joi.object({
    bigBlind: Joi.number().required(),
    communityCards: Joi.array()
      .items(
        Joi.object({
          cardShortCode: Joi.string().required(),
          rank: Joi.string().required(),
          suit: Joi.string().required(),
        }),
      )
      .required(),
    currentBet: Joi.number().required(),
    dealerPosition: Joi.number().required(),
    pot: Joi.number().required(),
    roundState: Joi.string().required(),
    seatToAct: Joi.number().required(),
    smallBlind: Joi.number().required(),
  }).required(),
}).unknown(false);
