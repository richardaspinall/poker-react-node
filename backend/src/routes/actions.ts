import express, { Request, Response } from 'express';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  console.log(req.body);
});

export default router;
