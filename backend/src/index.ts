import { createServer } from 'http';
import express, { Request, Response } from 'express';
import router from './routes';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', router);

const httpServer = createServer(app);

httpServer.listen(3000);
