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
    saveUninitialized: false,
  })
);

// For development only (CORS)
const corsOptions = {
  origin: 'http://127.0.0.1:5173', // Replace with your front-end domain
  credentials: true, // This allows the browser to send the cookie
};

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', router);

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer);
