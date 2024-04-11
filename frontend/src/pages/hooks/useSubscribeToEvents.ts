import { useEffect } from 'react';

import { useSocket } from '../../hooks/useSocket';

export function useSubscribeToEvents() {
  const { subscribeToEvent } = useSocket();

  useEffect(() => {
    const subscribeToPlayerJoined = subscribeToEvent('player_joined', () => {
      console.log('Player sat down');
    });

    const subscribeToPlayerLeave = subscribeToEvent('player_left', () => {
      console.log('Player left the table');
    });

    const subscribeToStartGame = subscribeToEvent('start_game', () => {
      console.log('Starting Game');
    });

    return () => {
      subscribeToPlayerJoined();
      subscribeToPlayerLeave();
      subscribeToStartGame();
    };
  }, [subscribeToEvent]);
}
