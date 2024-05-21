import { APIMethodShape } from '../APIMethodShape';

export const APIMethods: { [key: string]: APIMethodShape } = {
  check: {
    httpMethod: 'post',
    path: 'games.check',
    handler: '../../handlers/games/check/GamesCheckHandler.ts',
    handlerName: 'GamesCheckHandler',
  },
  fold: {
    httpMethod: 'post',
    path: 'games.fold',
    handler: '../../handlers/games/fold/GamesFoldHandler.ts',
    handlerName: 'GamesFoldHandler',
  },
  getGameState: {
    httpMethod: 'post',
    path: 'games.getGameState',
    handler: '../../handlers/games/getGameState/GamesGetGameStateHandler.ts',
    handlerName: 'GamesGetGameStateHandler',
  },
  bet: {
    httpMethod: 'post',
    path: 'players.bet',
    handler: '../../handlers/players/bet/PlayersCallHandler.ts',
    handlerName: 'PlayersCallHandler',
  },
  call: {
    httpMethod: 'post',
    path: 'players.call',
    handler: '../../handlers/players/call/PlayersCallHandler.ts',
    handlerName: 'PlayersCallHandler',
  },
  getSeats: {
    httpMethod: 'post',
    path: 'poker-tables.getSeats',
    handler: '../../handlers/poker-tables/getSeats/PokerTablesGetSeatsHandler.ts',
    handlerName: 'PokerTablesGetSeatsHandler',
  },
  join: {
    httpMethod: 'post',
    path: 'poker-tables.join',
    handler: '../../handlers/poker-tables/join/PokerTablesJoinHandler.ts',
    handlerName: 'PokerTablesJoinHandler',
  },
  leave: {
    httpMethod: 'post',
    path: 'poker-tables.leave',
    handler: '../../handlers/poker-tables/leave/PokerTablesLeaveHandler.ts',
    handlerName: 'PokerTablesLeaveHandler',
  },
  create: {
    httpMethod: 'post',
    path: 'users.create',
    handler: '../../handlers/users/create/UsersCreateHandler.ts',
    handlerName: 'UsersCreateHandler',
  },
  getProfile: {
    httpMethod: 'post',
    path: 'users.getProfile',
    handler: '../../handlers/users/getProfile/UsersGetProfileHandler.ts',
    handlerName: 'UsersGetProfileHandler',
  },
  signin: {
    httpMethod: 'post',
    path: 'users.signin',
    handler: '../../handlers/users/signin/UsersSigninHandler.ts',
    handlerName: 'UsersSigninHandler',
  },
} as const;
