import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import router from './routes';
import SocketServer from './sockets/SocketServer';
import PokerTable from './sockets/PokerTable';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer);
const newPokerTable = PokerTable.createPokerTable('table_1', 2);
