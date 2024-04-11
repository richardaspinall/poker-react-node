import { useEffect } from 'react';

import { useSocket } from '../../../hooks/useSocket';

/*
 * This hook uses the subscribeToEvent function from useSocket to add events to
 * the socket connection.
 *
 * TODO: We may want to split this into multiple hooks if the number of events grows.
 */
export function useSubscribeToGameEvents() {
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
