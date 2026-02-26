import { Card as CardType } from '../../../../../backend/src/shared/game/types/Card';
import { Card } from '../../Card/Card.tsx';

type BoardProps = {
  communityCards?: CardType[];
};

function Board({ communityCards }: BoardProps) {
  const boardSlots = Array.from({ length: 5 }, (_, index) => {
    const boardCard = communityCards?.[index];
    return (
      <div className="board-slot" key={`board-slot-${index}`}>
        {boardCard ? <Card cardShortCode={boardCard.cardShortCode} /> : null}
      </div>
    );
  });

  return (
    <div id="board-area">
      <div className="board-cards">{boardSlots}</div>
    </div>
  );
}

export default Board;
