import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import session, { Session } from 'express-session';
import router from './routes';
import SocketServer from './sockets/SocketServer';

declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean;
      userId: number;
    };
  }
}

const app = express();

// Session middleware configuration
app.use(
  session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true }, // Use secure: true only if you're on HTTPS
  })
);

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer);
