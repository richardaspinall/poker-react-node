import { createServer } from 'http';
import express, { Request, Response } from 'express';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const httpServer = createServer(app);

// routing
app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!');
});

app.post('/', (req: Request, res: Response) => {
  res.send('Hello Client!');
  console.log(req.body);
});

httpServer.listen(3000);
