type BoardProps = {};

function Board({}: BoardProps) {
  return (
    <div id="board-area">
      <div id="flop-area"></div>
      <div className="vl"></div>
      <div id="turn-area"></div>
      <div className="vl"></div>
      <div id="river-area"></div>
    </div>
  );
}

export default Board;
