import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { useSocket } from '../../../hooks/useSocket';
import {
  resetBets,
  setActingSeat,
  setCommunityCards,
  setPlayerBet,
  setPot,
} from '../../../store/slices/gameStateSlice';
import { setHoleCards } from '../../../store/slices/holeCardsSlice';
import { addUser, removeUser } from '../../../store/slices/seatsSlice';
import { AppDispatch } from '../../../store/store.tsx';
import fetchGameState from '../thunks/fetchGameState';

/*
 * This hook uses the subscribeToEvent function from useSocket to add events to
 * the socket connection.
 *
 * TODO: We may want to split this into multiple hooks if the number of events grows.
 */
export function useSubscribeToGameEvents() {
  const dispatch: AppDispatch = useDispatch();
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

    const subscribeToStartGame = subscribeToEvent('start_game', (payload) => {
      console.log('Starting Game');

      // TODO: should we send the game state  along with `start_game` event
      dispatch(fetchGameState({ pokerTableName: payload.tableName }));
    });

    const subscribeToDealGame = subscribeToEvent('deal_cards', (payload) => {
      console.log('Dealing cards');
      console.log('payload', payload);

      dispatch(setHoleCards(payload));
    });

    const subscribeToDealingCommunityCards = subscribeToEvent('deal_community_cards', (payload) => {
      console.log('Dealing community cards');
      console.log('payload', payload);

      dispatch(setCommunityCards(payload));
    });

    const subscribeToFoldCards = subscribeToEvent('fold_cards', () => {
      console.log('Folding cards');
    });

    const subscribeToSeatToAct = subscribeToEvent('seat_to_act', (payload) => {
      console.log('Seat to act');
      console.log('payload', payload);
      dispatch(setActingSeat(payload));
    });

    const subscribeToUpdatePot = subscribeToEvent('update_pot', (payload) => {
      console.log('Update pot');
      console.log('payload', payload);
      dispatch(setPot(payload));
    });

    const subscribePlayerBet = subscribeToEvent('player_bet', (payload) => {
      console.log('Player bet');
      console.log('payload', payload);
      dispatch(setPlayerBet(payload));
    });

    const subscribeResetBets = subscribeToEvent('reset_bets', () => {
      console.log('Reset pot');
      dispatch(resetBets());
    });

    return () => {
      subscribeToPlayerJoined();
      subscribeToPlayerLeft();
      subscribeToStartGame();
      subscribeToDealGame();
      subscribeToFoldCards();
      subscribeToSeatToAct();
      subscribeToDealingCommunityCards();
      subscribeToUpdatePot();
      subscribePlayerBet();
      subscribeResetBets();
    };
  }, [dispatch, subscribeToEvent]);
}
