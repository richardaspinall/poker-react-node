type ActionsProps = {};

function Actions({}: ActionsProps) {
  return (
    <div id="player-actions">
      {/* <div className="slidecontainer">
        <input type="range" min="0" max="10000" value="1000" className="slider" id="myRange"></input>
        <input id="bet-input" value="1000"></input>
      </div> */}
      <div>
        <button className="action-buttons" id="fold-action-button" aria-label="Fold">
          Fold
        </button>
        <button className="action-buttons" id="check-action-button" aria-label="Check">
          Check
        </button>
        <button className="action-buttons" id="call-action-button" aria-label="Call">
          Call
        </button>
        <button className="action-buttons" id="raise-action-button" aria-label="Bet">
          Bet
        </button>
      </div>
    </div>
  );
}

export default Actions;
