import { useState, useEffect, useCallback } from 'react';

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

    // const onPlayerJoined = () => {
    //   console.log('Player sat down');
    // };

    const onPlayerLeft = () => {
      console.log('Player left');
    };

    const onGameReady = () => {
      console.log('Starting Game');
    };

    // Register event handlers
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello_from_server', onHelloFromServer);
    // socket.on('player_joined', onPlayerJoined);
    socket.on('player_left', onPlayerLeft);
    socket.on('start_game', onGameReady);

    // Cleanup on component unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('hello_from_server', onHelloFromServer);
      //   socket.off('player_joined', onPlayerJoined);
      socket.off('player_left', onPlayerLeft);
      socket.off('start_game', onGameReady);
    };
  }, []);

  const subscribeToEvent = useCallback((event, callback) => {
    socket.on(event, callback);

    // Return a cleanup function
    return () => {
      socket.off(event, callback);
    };
  }, []);

  return { isConnected, subscribeToEvent }; // Expose any states or functions that components might need
}
