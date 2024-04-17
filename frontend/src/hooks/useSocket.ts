import { useCallback, useEffect, useState } from 'react';

import { ServerToClientEventParams, ServerToClientEvents } from '../../../backend/src/shared/websockets/SocketEvents';
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

    // Register event handlers
    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('hello_from_server', onHelloFromServer);

    // Cleanup on component unmount
    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('hello_from_server', onHelloFromServer);
    };
  }, []);

  const subscribeToEvent = useCallback(
    <E extends keyof ServerToClientEvents>(event: E, callback: (payload: ServerToClientEventParams<E>) => void) => {
      socket.on(event, callback as any);

      // Return a cleanup function
      return () => {
        socket.off(event, callback as any);
      };
    },
    []
  );

  return { isConnected, subscribeToEvent }; // Expose any states or functions that components might need
}
