import { Card as CardType } from '../../../../../backend/src/shared/game/types/Card';
import { CardShortCode } from '../../../../../backend/src/shared/game/types/CardShortCode';
import { Card } from '../../Card/Card.tsx';

type BoardProps = {
  communityCards?: CardType[];
};

function Board({ communityCards }: BoardProps) {
  return (
    <div id="board-area">
      <div id="flop-area"></div>
      {communityCards && communityCards[0] && <Card cardShortCode={communityCards[0].cardShortCode} />}
      {communityCards && communityCards[1] && <Card cardShortCode={communityCards[1].cardShortCode} />}
      {communityCards && communityCards[2] && <Card cardShortCode={communityCards[2].cardShortCode} />}

      <div className="vl"></div>
      <div id="turn-area">
        {communityCards && communityCards[3] && <Card cardShortCode={communityCards[3].cardShortCode} />}
      </div>

      <div className="vl"></div>
      <div id="river-area">
        {communityCards && communityCards[4] && <Card cardShortCode={communityCards[4].cardShortCode} />}
      </div>
    </div>
  );
}

export default Board;
