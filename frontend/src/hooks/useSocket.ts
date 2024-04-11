import { useCallback, useEffect, useState } from 'react';

import { ServerToClientEvents } from '../../../backend/src/sockets/SocketEvents';
import { socket } from '../Socket';

export function useSocket() {
  const [isConnected, setIsConnected] = useState<boolean>(socket.connected);

  useEffect(() => {
    // Define event handlers
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    const onHelloFromServer = () => {
      console.log('Hello from server');
    };

    const onGameReady = () => {
      console.log('Starting Game');
    };

    // Register event handlers
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello_from_server', onHelloFromServer);
    socket.on('start_game', onGameReady);

    // Cleanup on component unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('hello_from_server', onHelloFromServer);
      socket.off('start_game', onGameReady);
    };
  }, []);

  const subscribeToEvent = useCallback((event: keyof ServerToClientEvents, callback: () => void) => {
    socket.on(event, callback);

    // Return a cleanup function
    return () => {
      socket.off(event, callback);
    };
  }, []);

  return { isConnected, subscribeToEvent }; // Expose any states or functions that components might need
}
