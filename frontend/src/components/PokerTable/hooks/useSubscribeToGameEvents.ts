import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSocket } from '../../../hooks/useSocket';
import { addUser, removeUser } from '../../../store/seatsSlice';

/*
 * This hook uses the subscribeToEvent function from useSocket to add events to
 * the socket connection.
 *
 * TODO: We may want to split this into multiple hooks if the number of events grows.
 */
export function useSubscribeToGameEvents() {
  const dispatch = useDispatch();
  const { subscribeToEvent } = useSocket();

  useEffect(() => {
    const subscribeToPlayerJoined = subscribeToEvent('player_joined', (playerData) => {
      console.log('Player sat down');
      dispatch(addUser({ username: playerData.username, seatNumber: playerData.seatNumber }));
    });
    const subscribeToPlayerLeave = subscribeToEvent('player_left', (playerData) => {
      console.log('Player left the table');

      dispatch(removeUser({ username: playerData.username, seatNumber: playerData.seatNumber }));
    });

    const subscribeToStartGame = subscribeToEvent('start_game', () => {
      console.log('Starting Game');
    });

    return () => {
      subscribeToPlayerJoined();
      subscribeToPlayerLeave();
      subscribeToStartGame();
    };
  }, [dispatch, subscribeToEvent]);
}
