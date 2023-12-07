// External modules
import express, { Request, Response } from 'express';

// Iternal modules
import Logger from '../utils/Logger';

const debug = Logger.newDebugger('APP:routes:PokerActions');
const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  debug(req.body);
});

export { router };
