import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { socket } from './Socket';
import { ConnectionManager } from './components/ConnectionManager';
import { ConnectionState } from './components/ConnectionState';
import { CreateAccount } from './pages/CreateAccount';
import { Home } from './pages/Home';
import { Layout } from './pages/Layout';
import { Play } from './pages/Play';
import { Signin } from './pages/Signin';

// https://socket.io/how-to/use-with-react
export default function App() {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
    }

    function onDisconnect() {
      setIsConnected(false);
    }
    function onHelloFromServer() {
      console.log('Hello from server');
    }
    function onPlayerJoined() {
      console.log('Player sat down');
    }
    function onPlayerLeft() {
      console.log('Player left');
    }
    function onGameReady() {
      console.log('Starting Game');
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello_from_server', onHelloFromServer);
    socket.on('player_joined', onPlayerJoined);
    socket.on('player_left', onPlayerLeft);
    socket.on('start_game', onGameReady);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('hello_from_server', onHelloFromServer);
      socket.off('player_joined', onPlayerJoined);
      socket.off('player_left', onPlayerLeft);
      socket.off('start_game', onGameReady);
    };
  }, []);

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
