// External modules
import express, { Request, Response } from 'express';
import Rooms from '../sockets/Rooms';
import PokerTable from '../sockets/PokerTable';
import { join } from 'path';

// Iternal modules
import Logger from '../utils/Logger';

const debug = Logger.newDebugger('APP:Routes:actions');
export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  debug(req.body);
});

router.post('/playerSit', (req: Request, res: Response) => {
  // res.send('Hello World!');
  let seatNumber = req.body.selectedSeatNumber;
  let clientId = req.body.socketId
  console.log(req.body);
  console.log("seat " + req.body.selectedSeatNumber)
  console.log("socketId " + req.body.socketId)

  // join pokertable

  // pull in table manger via client id/socket id


  // const tables = PokerTable.getAllTables();
  // console.log(tables);

  // then sit at PokerTable
  let join_room = PokerTable.sitAtTable('table_1', seatNumber, clientId);
  // console.log(join_room);
  if (!join_room.ok){
    res.send({'ok':false})
  }

  // print the table for now to check it was update
  let updated_table = PokerTable.getTable('table_1');
  // console.log('update table');
  // console.log(updated_table);

  // emit event to all clients connected that a player has sat down
  // everyone that has client id/socket connected to room
  let event = 'player_joined';
  let payload = {
    "playerId": clientId
  };
  Rooms.sendEventToRoom('table_1', event, payload);

  res.send({'ok':true})
  // check memory store to check other player isn't also on seat

  // if someone is already sitting there send back a failed messages



  // add clickup notes for branch


  // other workres.send()
  //start adding classes or table for game
  // how to keep score etc

  // Return success response

});

export default router;
