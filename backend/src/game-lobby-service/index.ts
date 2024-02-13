import GameLobbyService from './GameLobbyService';
// Seed for now
const gameLobbyService = new GameLobbyService();
console.log('here');
gameLobbyService.createPokerTable('table_1', 2);
export default gameLobbyService;
