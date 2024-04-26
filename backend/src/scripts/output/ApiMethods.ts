import { APIMethodShape } from './APIMethodShape';

export const ApiMethods: { [key: string]: APIMethodShape } = {
  getSeats: {
    httpMethod: 'POST',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/PokerTableGetSeatsHandler.ts',
    handlerName: 'PokerTableGetSeatsHandler',
  },

  getSeatsNew: {
    httpMethod: 'POST',
    path: 'poker-tables.getSeatsNew',
    handler: '../../handlers/poker-tables/PokerTableGetSeatsNewHandler.ts',
    handlerName: 'PokerTableGetSeatsNewHandler',
  },
} as const;
