import GameLobbyService from './GameLobbyService';

// TODO: Seed / hardcode for now until we are working with a DB
const gameLobbyService = new GameLobbyService();
console.log('here');
gameLobbyService.createPokerTable('table_1', 2);
export default gameLobbyService;
