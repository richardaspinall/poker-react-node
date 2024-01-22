import { createServer } from 'http';
import express from 'express';
import cors from 'cors';
import router from './routes';
import SocketServer from './sockets/SocketServer';
import PokerTable from './game/PokerTable';

const app = express();

// middleware to parse json and urlencoded request body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use('/api', router);

app.use('/pokerTables.getState', (req, res) => {
  console.log('getState');

  const seats = {
    seat1: {
      player: {
        name: 'Alice',
        stack: 1500,
        seatNumber: 1,
      },
    },
    seat2: {
      player: {
        name: 'Bob',
        stack: 2000,
        seatNumber: 2,
      },
    },
  };
  const tableName = 'REDUXTEST';

  res
    .json({
      ok: true,
      state: {
        tableName,
        seats,
        board: [],
        pot: 0,
        dealer: 'seat1',
        smallBlind: 5,
        bigBlind: 10,
        currentTurn: 'seat1',
        currentBet: 0,
        lastRaise: 0,
        lastRaiseAmount: 0,
        lastRaisePlayer: 0,
        lastRaiseTotal: 0,
      },
    })
    .send();
});

const httpServer = createServer(app);

httpServer.listen(3000);

SocketServer.initialize(httpServer);

export default httpServer;

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

export { shutDown };
