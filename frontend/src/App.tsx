import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { socket } from './Socket';
import { useSocket } from './hooks/useSocket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';
import { CreateAccount } from './pages/CreateAccount';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Play } from './pages/Play';
import { Signin } from './pages/Signin';
import { Play } from './pages/Play';
import { useEffect } from 'react';

// https://socket.io/how-to/use-with-react
export default function App() {
  const { isConnected, subscribeToEvent } = useSocket();

  // TODO: push down to appropriate component
  useEffect(() => {
    return subscribeToEvent('player_joined', () => {
      console.log('Player sat down');
    });
  }, [subscribeToEvent]);

  return (
    <div className="App">
      <BrowserRouter>
        <ConnectionState isConnected={isConnected} />
        <ConnectionManager />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/createaccount" element={<CreateAccount />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/play" element={<Play />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
