import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { Card as CardType } from '../../../../../backend/src/shared/game/types/Deck';
import apiCall from '../../../fetch/apiCall';
import { selectUsername } from '../../../store/selectors.ts';
import { Card } from '../../Card/Card.tsx';

type SeatProps = {
  seatNumber: number;
  userName?: string;
  chipCount: number;
  cards?: CardType[];
};

export default function Seat({ seatNumber, userName, chipCount, cards }: SeatProps) {
  const myUsername = useSelector(selectUsername);

  const onPlayerSit = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber };

    const result = await apiCall.post('poker-tables.join', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber]);

  const playerLeave = useCallback(async () => {
    const payload = { selectedSeatNumber: seatNumber };
    const result = await apiCall.post('poker-tables.leave', payload);
    if (!result?.ok) {
      // Do something with the error
      console.log(result?.error);
    }
  }, [seatNumber]);

  // Define a function to render the cards if the user is in the hand
  const renderUserCards = () => {
    if (myUsername === userName && cards?.[0]) {
      return (
        <>
          <Card cardCode={cards[0].shortCode} />
          <Card cardCode={cards[1].shortCode} />
        </>
      );
    }
    return null;
  };

  // Define a function to render the username or "Empty" if it's not available
  const renderUsername = () => {
    if (userName && userName !== myUsername) {
      return userName;
    } else if (userName !== myUsername) {
      return 'Empty';
    }
  };
  // TODO: below we need to see if the other users are in the game (to show the backs of cards)
  return (
    <div>
      <button className="seat" id={`seat-${seatNumber}`} data-chip-count={chipCount} onClick={onPlayerSit}>
        {renderUserCards()}
        {renderUsername()}
      </button>
      <button onClick={playerLeave}>Leave Seat {seatNumber}</button>
    </div>
  );
}
