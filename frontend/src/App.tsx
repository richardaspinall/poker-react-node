import { useState, useEffect } from 'react';
import { socket } from './Socket';
import { ConnectionState } from './components/ConnectionState';
import { ConnectionManager } from './components/ConnectionManager';
import { MyForm } from './components/MyForm';
import { Table } from './components/Table/Table';

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

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello_from_server', onHelloFromServer);
    socket.on('player_joined', (payload) => {
      console.log('logging app tsx');
      console.log(payload)
    });

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('hello_from_server', onHelloFromServer);
    };
  }, []);

  return (
    <div className="App">
      <ConnectionState isConnected={isConnected} />
      <ConnectionManager />
      <MyForm />
      <Table />
    </div>
  );
}
