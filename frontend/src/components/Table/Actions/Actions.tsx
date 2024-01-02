type ActionsProps = {};

function Actions({}: ActionsProps) {
  return (
    <div id="player-actions">
      <div className="slidecontainer">
        <input type="range" min="0" max="10000" value="1000" className="slider" id="myRange"></input>
        <input id="bet-input" value="1000"></input>
      </div>
      <div>
        <button className="action-buttons" id="fold-action-button">
          Fold
        </button>
        <button className="action-buttons" id="check-action-button">
          Check
        </button>
        <button className="action-buttons" id="call-action-button">
          Call
        </button>
        <button className="action-buttons" id="raise-action-button">
          Bet
        </button>
        <button className="action-buttons" id="leave-table-button">
          Leave
        </button>
      </div>
    </div>
  );
}

export default Actions;
