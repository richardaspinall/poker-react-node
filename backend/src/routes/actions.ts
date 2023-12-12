// External modules
import express, { Request, Response } from 'express';
import Rooms from '../game/Rooms';
import PokerTable from '../game/PokerTable';

// Iternal modules
import Logger from '../utils/Logger';
import { PlayerSitPayload, PlayerSitResult } from '../shared/api/types/PlayerSit';

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
  // Try to sit at table
  let join_room = PokerTable.sitAtTable('table_1', seatNumber, clientId);
  if (!join_room.ok){
    return res.send({'ok':false})
  }
  // Emit event to all clients connected that a player has sat down
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
