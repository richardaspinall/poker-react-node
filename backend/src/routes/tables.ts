// External modules
import express, { Request, Response } from 'express';

// Iternal modules
import Logger from '../utils/Logger';
import GameService from '../game/GameService';

const debug = Logger.newDebugger('APP:routes:tables');
const router = express.Router();

const gameService = new GameService();

// TODO: need to think about how to handle the table creation and what
// we return
router.post('/table.create', (req, res) => {
  const numSeats = req.body.numSeats;
  const table = gameService.createTable(numSeats);
  res.status(201).json(table);
});

router.post('/table.view', (req: Request, res: Response) => {
  // sent when a player views a table
  // - add their socket to the room for updates
  res.send('Hello World!');
  debug(req.body);
});

router.post('/table.join', (req: Request, res: Response) => {
  // sent when a player joins a table / sits at a table
  // - send out a message to the table that a player has joined
  res.send('Hello World!');
  debug(req.body);
});

export { router };
