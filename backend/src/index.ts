// External
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import session, { Session } from 'express-session';

// Internal
import { router } from '@infra/routes';
import { GlobalErrorHandler } from '@infra/GlobalErrorHandler';
import { SocketServer } from './sockets/SocketServer';

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
// TODO: edit the secret key with env var
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
app.use(GlobalErrorHandler.handleError);

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer);

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
