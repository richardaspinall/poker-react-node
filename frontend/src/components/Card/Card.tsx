import { CardShortCode } from '../../../../backend/src/shared/game/types/CardShortCode';
import { cardMap } from './cardMap';

interface CardProps {
  cardShortCode: CardShortCode;
}

export function Card({ cardShortCode }: Readonly<CardProps>) {
  const CardSVG = cardMap[cardShortCode];

  return (
    <div className="card">
      {CardSVG ? <img src={CardSVG} className="" alt="Facedown cards" /> : <p>Card not found</p>}
    </div>
  );
}
