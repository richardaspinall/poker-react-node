// External modules
import express, { Request, Response } from 'express';

// Iternal modules
import Logger from '../utils/Logger';
import GameService from '../game/GameService';

const debug = Logger.newDebugger('APP:routes:PokerTables');
const router = express.Router();

const gameService = new GameService();

// TODO: need to think about how to handle the table creation and what
// we return
router.post('/pokertables.create', (req, res) => {
  const name = req.body.name;
  const numSeats = req.body.numSeats;
  const createPokerTableRes = gameService.createPokerTable(name, numSeats);

  if (createPokerTableRes.isError) {
    res.status(400).json({ error: createPokerTableRes.errorMessage });
    return;
  }
  res.sendStatus(200);
});

router.post('/pokertables.view', (req: Request, res: Response) => {
  // ? encapsulate in table view handler?
  //
  // sent when a player views a table
  // - add their socket to the room for updates
  // - send out a message to the table that a player has joined
  // - respond with the table state
  res.send('Table Viewed!');
  debug(req.body);
});

router.post('/pokertables.join', (req: Request, res: Response) => {
  // sent when a player joins a table / sits at a table
  // - send out a message to the table that a player has joined
  // - respond with empty ok (socket will send updated table state)
  res.send('Table Joined!');
  debug(req.body);
});

// maybe this should be "game.newHand" or something
router.post('/pokertables.newHand', (req: Request, res: Response) => {
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