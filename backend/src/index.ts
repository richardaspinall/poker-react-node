import cors from 'cors';
import express from 'express';
import session, { Session } from 'express-session';
import { createServer } from 'http';

import { GlobalErrorHandler } from '@infra/GlobalErrorHandler';
import { router } from '@infra/routes';

import { SocketServer } from './sockets/SocketServer';
import { SessionStore } from './users/SessionStore';

declare module 'http' {
  interface IncomingMessage {
    session: Session & {
      authenticated: boolean;
      username: string;
    };
  }
}

const app = express();

// Session middleware configuration
// TODO: edit the secret key with env var

const sessionMiddleware = session({
  store: new SessionStore(),
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false,
});
app.use(sessionMiddleware);

// For development only (CORS)
const corsOptions = {
  origin: 'http://localhost:5173', // Replace with your front-end domain
  credentials: true, // This allows the browser to send the cookie
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', '*'], // Allowed custom headers
};

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors(corsOptions));

app.use('/api', router);
app.use(GlobalErrorHandler.handleError);

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer, sessionMiddleware);

// Function to shut down the server (used in tests)
async function shutDown(): Promise<void> {
  // Close socket connections here (if applicable)
  // For example: SocketServer.closeAllConnections();

  // Close the HTTP server
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        console.error('Error shutting down the server:', err);
        reject(err);
        return;
      }
      resolve();
    });
  });
}

export { httpServer, SocketServer, shutDown };
