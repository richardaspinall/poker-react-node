// External modules
import express, { Request, Response } from 'express';

// Iternal modules
import Logger from '../utils/Logger';
import GameService from '../game/GameService';
import { tableCreateSchema, validatePayload, TableCreatePayload } from '../shared/api/types/TableCreate';

const debug = Logger.newDebugger('APP:routes:tables');
const router = express.Router();

const gameService = new GameService();

// TODO: need to think about how to handle the table creation and what
// we return
router.post('/tables.create', (req: Request, res: Response) => {
  const payloadOrError = validatePayload<TableCreatePayload>(tableCreateSchema, req.body);

  if (payloadOrError.isError) {
    res.status(400).send({ error: payloadOrError.errorMessage, error_details: payloadOrError.errorDetails });
    return;
  }

  const payload = payloadOrError;
  const name = payload.getValue().name;
  const numSeats = payload.getValue().numSeats;

  const createPokerTable = gameService.createPokerTable(name, numSeats);

  if (createPokerTable.isError) {
    res.status(409).json({ error: createPokerTable.errorMessage });
    return;
  }
  res.sendStatus(200);
});

router.post('/tables.view', (req: Request, res: Response) => {
  // ? encapsulate in table view handler?
  //
  // sent when a player views a table
  // - add their socket to the room for updates
  // - send out a message to the table that a player has joined
  // - respond with the table state
  res.send('Table Viewed!');
  debug(req.body);
});

router.post('/tables.join', (req: Request, res: Response) => {
  // sent when a player joins a table / sits at a table
  // - send out a message to the table that a player has joined
  // - respond with empty ok (socket will send updated table state)
  res.send('Table Joined!');
  debug(req.body);
});

// maybe this should be "game.newHand" or something
router.post('/tables.newHand', (req: Request, res: Response) => {
  // sent from both players to start a new hand
  // - check that there isn't an ongoing hand
  // - check that at least two players are seated and ready to play
  //    - if not, set the player to ready
  // - start a new hand
  // - respond with empty ok
  res.send('Starting new hand!');
  debug(req.body);
});

export { router };
