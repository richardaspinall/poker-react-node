import { CardCode } from '../../../../backend/src/shared/game/types/Deck';
import { cardMap } from './cardMap';

interface CardProps {
  cardCode: CardCode;
}

export function Card({ cardCode }: Readonly<CardProps>) {
  const CardSVG = cardMap[cardCode];

  return (
    <div className="card">
      {CardSVG ? <img src={CardSVG} className="" alt="Facedown cards" /> : <p>Card not found</p>}
    </div>
  );
}
