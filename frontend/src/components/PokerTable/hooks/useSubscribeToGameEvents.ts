import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSocket } from '../../../hooks/useSocket';
import { setHoleCards } from '../../../store/holeCardsSlice';
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
    const subscribeToPlayerJoined = subscribeToEvent('player_joined', (payload) => {
      console.log('Player sat down');

      dispatch(addUser(payload));
    });
    const subscribeToPlayerLeft = subscribeToEvent('player_left', (payload) => {
      console.log('Player left the table');

      dispatch(removeUser(payload));
    });

    const subscribeToStartGame = subscribeToEvent('start_game', () => {
      console.log('Starting Game');
    });

    const subscribeToDealGame = subscribeToEvent('deal_cards', (payload) => {
      console.log('Dealing cards');

      dispatch(setHoleCards(payload));
    });

    return () => {
      subscribeToPlayerJoined();
      subscribeToPlayerLeft();
      subscribeToStartGame();
      subscribeToDealGame();
    };
  }, [dispatch, subscribeToEvent]);
}
