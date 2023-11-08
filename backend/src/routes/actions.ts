import express, { Request, Response } from 'express';

export const router = express.Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

router.post('/', (req: Request, res: Response) => {
  res.send('Hello World!');
  console.log(req.body);
  if (req.session.authenticated === true) {
    console.log('authenticated');
  } else {
    console.log('not authenticated');
  }
  console.log(req.session.userId);
});

export default router;
