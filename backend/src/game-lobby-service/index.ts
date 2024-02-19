import GameLobbyService from './GameLobbyService';
// Seed for now
const gameLobbyService = new GameLobbyService();
gameLobbyService.createPokerTable('table_1', 2);
export default gameLobbyService;
