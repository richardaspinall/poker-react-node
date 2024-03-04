// External
import { createServer } from 'http';
import express from 'express';
import cors from 'cors';

// Internal
import { router } from './routes';
import { SocketServer } from './sockets/SocketServer';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

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
