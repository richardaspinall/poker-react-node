// ChipDisplay.js
import React from 'react';

import Chip from './Chip';

const ChipDisplay = ({ totalValue }) => {
  const denominations = [100, 50, 10, 5, 1]; // Add more denominations as needed
  let remainingValue = totalValue;
  const chips = [];

  denominations.forEach((denom) => {
    const count = Math.floor(remainingValue / denom);
    remainingValue %= denom;
    for (let i = 0; i < count; i++) {
      chips.push(<Chip key={`${denom}-${i}`} value={denom} index={i} />);
    }
  });

  return <div className="chip-display">{chips}</div>;
};

export default ChipDisplay;
