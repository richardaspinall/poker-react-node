// External modules
import express, { Request, Response } from 'express';
import Rooms from '../sockets/Rooms';
import PokerTable from '../sockets/PokerTable';
import { join } from 'path';

// Iternal modules
import Logger from '../utils/Logger';
import { PlayerSitPayload } from '../shared/api/types/PlayerSit';
import { ResultError } from '../shared/Result';

const debug = Logger.newDebugger('APP:Routes:actions');
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  debug(req.body);
});

router.post('/playerSit', (req: Request, res: Response<PlayerSitResult>) => {
  const body = req.body as PlayerSitPayload;
  let seatNumber = body.selectedSeatNumber;
  let clientId = body.socketId
  // then sit at PokerTable
  let join_room = PokerTable.sitAtTable('table_1', seatNumber, clientId);
  console.log('try to sit ',join_room);
  console.log('try to sit ok check ',join_room.ok);
  if (join_room.ok == false){
    return res.send({'text':'bad'})
  }
  // emit event to all clients connected that a player has sat down
  let event = 'player_joined';
  let payload = {
    "playerId": clientId,
    "seatId": seatNumber
  };
  let send_events = Rooms.sendEventToRoom('table_1', event, payload);
  if (!send_events.ok){
    return res.send({'ok':false})
  }
  return res.send({'ok':true})
});

export default router;
