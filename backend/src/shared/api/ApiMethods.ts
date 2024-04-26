import { ApiMethodShape } from './APIMethodShape';

export const ApiMethods: { [key: string]: ApiMethodShape } = {
  getSeats: {
    httpMethod: 'post',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/PokerTableGetSeatsHandler.ts',
    handlerName: 'PokerTableGetSeatsHandler',
  },
} as const;
