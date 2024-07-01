import { Result } from '../infra/Result';
import { GameEmitter } from '../game-emitter';
import { Game } from './Game';
import { PokerTable } from './PokerTable';
import { GameDoesNotExist } from '../handlers/games/errors/gen/GameDoesNotExist';
import { PlayerAlreadyFolded } from '../handlers/games/errors/gen/PlayerAlreadyFolded';
import { PlayerNotFoundAtPokerTableError } from '../handlers/poker-tables/errors/gen/PlayerNotFoundAtPokerTableError';
import { PlayerActionInvalid } from '../generalErrors/PlayerActionInvalid';
import { PlayerActionUndefined } from '../generalErrors/PlayerActionUndefined';
import { CurrentActionUndefined } from '../generalErrors/CurrentActionUndefined';
import { SeatUndefined } from '../generalErrors/SeatUndefined';
import { NotPlayersTurn } from '../handlers/games/errors/gen/NotPlayersTurn';

export class Dealer {
  public static newGame(pokerTable: PokerTable) {
    const smallBlind = 1;
    const bigBlind = smallBlind * 2;

    pokerTable.addGame(new Game(pokerTable.getDealerPosition(), smallBlind, bigBlind));

    const playerCount = pokerTable.getPlayerCount();

    // Dealer position is always the first player to act when there are 3 or less players
    if (playerCount > 3) {
      pokerTable
        .getGame()
        ?.getGameState()
        .updateSeatToAct(pokerTable.getDealerPosition() + 3);
    } else {
      pokerTable.getGame()?.getGameState().updateSeatToAct(pokerTable.getDealerPosition());
    }

    GameEmitter.eventEmitter.emit('startGame', pokerTable);

    Dealer.dealCards(pokerTable);
    Dealer.startTurn(pokerTable);
  }

  public static dealCards(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const deck = game.getDeck();

    const seats = pokerTable.getSeats();

    seats.forEach((seat) => {
      const player = seat.getPlayer();
      if (player) {
        player.setCards(deck.draw(2));
        GameEmitter.eventEmitter.emit('sendHoleCards', player.getUserId(), player.getCards());
      }
    });
  }

  public static foldCards(pokerTable: PokerTable, userId: number) {
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExist());
    }

    const seats = pokerTable.getSeats();
    for (const seat of seats) {
      if (seat.getPlayer()?.getUserId() === userId) {
        if (!(game.getGameState().getSeatToAct() === seat.getSeatNumber())){
          return Result.error(new NotPlayersTurn());
        }

        const player = seat.getPlayer();
        const playerCards = player?.getCards();
        if (!(playerCards && playerCards.length > 0)){
          return Result.error(new PlayerAlreadyFolded());
        }

        if (!player){
          return Result.error(new PlayerNotFoundAtPokerTableError());
        }
          
        player.foldCards();
        GameEmitter.eventEmitter.emit('foldCards', pokerTable.getName(), player.getUsername(), seat.getSeatNumber());
        return Result.success();
      }
    }
    return Result.error(new PlayerNotFoundAtPokerTableError());
  }

  public static startTurn(pokerTable: PokerTable) {
    const game = pokerTable.getGame();
    if (!game) {
      throw new Error('Game not found');
    }

    const seatToAct = game.getGameState().getSeatToAct();
    const seats = pokerTable.getSeats();

    const seat = seats.find((seat) => seat.getSeatNumber() === seatToAct);

    if (!seat) {
      throw new Error(`Seat not found: ${seatToAct}`);
    }

    GameEmitter.eventEmitter.emit('notifyPlayerToAct', pokerTable.getName(), seat.getSeatNumber());
    
  }

  public static updateTurn(pokerTable: PokerTable, nextSeatToAct: number) {
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExist());
    }
    console.log(`next seat ${nextSeatToAct}`);
    game.getGameState().updateSeatToAct(nextSeatToAct);
    GameEmitter.eventEmitter.emit('notifyPlayerToAct', pokerTable.getName(), nextSeatToAct);
  }

  public static actionHandler(pokerTable: PokerTable, playerAction: string, playerBet: number, userid: number){
    const game = pokerTable.getGame();
    if (!game) {
      return Result.error(new GameDoesNotExist());
    }

    const currentAction = pokerTable.getGame()?.getGameState().getCurrentAction();
    if (currentAction === undefined){
      return Result.error(new CurrentActionUndefined());
    }

    const lastRaisedBy = pokerTable.getGame()?.getGameState().getLastRaisedBy();
    const seats = pokerTable.getSeats();
    const seat = seats.find((seat) => seat.getPlayer()?.getUserId() === userid);
    if (seat === undefined){
      return Result.error(new SeatUndefined());
    }

    const currentSeatToAct = game.getGameState().getSeatToAct();
    if (currentSeatToAct !== seat.getSeatNumber()){
      return Result.error(new NotPlayersTurn());
    }

    const player = seat.getPlayer();

    let actionRank = {
      'initial': -1,
      'fold' : 0,
      'check' : 1,
      'call': 2,
      'bet':3,
      'raise': 4
      // 'reraise': 5
    }

    switch (playerAction){
      case 'fold':
        this.foldCards(pokerTable, userid);
        player?.updatePlayerAction(playerAction);
        break;
      // do we need to discern between call and check when comparing? 
      // do we need to check they are allowed to check iunstead of call or will front end do that?
      case 'check':
        if (actionRank[currentAction] > 2){
          return Result.error(new PlayerActionInvalid());
        }

        // since it will be check or call do we need to update game action?
        player?.updatePlayerAction(playerAction);
        break;
      case 'call':
        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        player?.updatePlayerAction(playerAction);
        break;
      case 'bet':
        if (actionRank[currentAction] >  3){
          return Result.error(new PlayerActionInvalid());
        }

        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);
        
        player?.updatePlayerAction(playerAction);
        break;
      case 'raise':
        if (actionRank[currentAction] < 3){
          return Result.error(new PlayerActionInvalid());
        }

        pokerTable.getGame()?.getGameState().updateCurrentAction(playerAction);
        pokerTable.getGame()?.getGameState().updateCurrentBet(playerBet);
        pokerTable.getGame()?.getGameState().updateLastRaisedBy(currentSeatToAct);
        player?.updatePlayerAction(playerAction);
        break;
    }

    // check for next player
    // if next player action is not fold and game action is not matching then it is their turn
    for (let i = currentSeatToAct; i < seats.length; i++){
      console.log(`current seat ${currentSeatToAct}`);
      let nextSeatToAct = (currentSeatToAct % seats.length) + 1;
      console.log(`nextSeatToAct seat ${nextSeatToAct}`);
      const seat = seats.find((seat) => seat.getSeatNumber() === nextSeatToAct);
      if (seat === undefined){
        return Result.error(new SeatUndefined());
      }
  
      const nextPlayerToAct = seat.getPlayer();
      const nextPlayerPreviousAction = nextPlayerToAct?.getPlayerAction();
      if (nextPlayerPreviousAction === undefined){
        return Result.error(new PlayerActionUndefined());
      }
      console.log(`next player action ${actionRank[nextPlayerPreviousAction]}`);
      console.log(`currentAction ${actionRank[currentAction]}`);
      console.log(`seat number ${seat.getSeatNumber()}`);
      if (actionRank[nextPlayerPreviousAction] === -1){
        this.updateTurn(pokerTable, nextSeatToAct);
        return Result.success();
      }

      if (actionRank[nextPlayerPreviousAction] > 0){
        if (actionRank[nextPlayerPreviousAction] !== actionRank[currentAction]){
          this.updateTurn(pokerTable, nextSeatToAct);
          return Result.success();
        } else {
          // Handle multiple raises
          if (playerAction === 'raise' && seat?.getSeatNumber() !== lastRaisedBy){
            this.updateTurn(pokerTable, nextSeatToAct);
            return Result.success();
          }
        }
      }
    }
    game.startNextRound();
    return Result.success();
  }
}
