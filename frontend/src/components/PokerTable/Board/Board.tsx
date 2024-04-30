import { Card } from '../../Cards/Card.tsx';
import { CardCode } from '../../Cards/cardMap.ts';

type BoardProps = {};

function Board({}: BoardProps) {
  return (
    <div id="board-area">
      <div id="flop-area"></div>
      <Card cardCode={CardCode.AceOfSpades} />
      <Card cardCode={CardCode.KingOfSpades} />
      <Card cardCode={CardCode.QueenOfSpades} />
      <div className="vl"></div>
      <div id="turn-area"></div>
      <Card cardCode={CardCode.JackOfSpades} />
      <div className="vl"></div>
      <div id="river-area"></div>
      <Card cardCode={CardCode.TenOfSpades} />
    </div>
  );
}

export default Board;
