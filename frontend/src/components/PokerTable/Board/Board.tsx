import { CardShortCode } from '../../../../../backend/src/shared/game/types/CardShortCode';
import { Card } from '../../Card/Card.tsx';

type BoardProps = {};

function Board({}: BoardProps) {
  return (
    <div id="board-area">
      <div id="flop-area"></div>
      <Card cardShortCode={CardShortCode.AceOfSpades} />
      <Card cardShortCode={CardShortCode.KingOfSpades} />
      <Card cardShortCode={CardShortCode.QueenOfSpades} />
      <div className="vl"></div>
      <div id="turn-area"></div>
      <Card cardShortCode={CardShortCode.JackOfSpades} />
      <div className="vl"></div>
      <div id="river-area"></div>
      <Card cardShortCode={CardShortCode.TenOfSpades} />
    </div>
  );
}

export default Board;
