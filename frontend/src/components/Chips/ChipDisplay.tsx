// ChipDisplay.tsx
import React from 'react';

import Chip from './Chip';

interface ChipDisplayProps {
  totalValue: number;
}

function ChipDisplay({ totalValue }: ChipDisplayProps) {
  const denominations = [10000, 5000, 1000, 500, 100, 10, 5, 1]; // Add more denominations as needed

  let remainingValue = totalValue;
  const piles = [];
  const maxChipsPerPile = 10; // Maximum number of chips per pile

  denominations.forEach((denom) => {
    const count = Math.floor(remainingValue / denom);
    remainingValue %= denom;
    const pileCount = Math.ceil(count / maxChipsPerPile);

    for (let pileIndex = 0; pileIndex < pileCount; pileIndex++) {
      const chips = [];
      for (let i = 0; i < maxChipsPerPile; i++) {
        const chipIndex = pileIndex * maxChipsPerPile + i;
        if (chipIndex >= count) break;
        const top = i * -8; // Adjust stacking offset

        chips.push(<Chip key={`${denom}-${chipIndex}`} value={denom} style={{ top: `${top}px` }} />);
      }

      piles.push(
        <div key={`pile-${denom}-${pileIndex}`} className="chip-pile">
          {chips}
        </div>,
      );
    }
  });

  return <div className="chip-display">{piles}</div>;
}

export default ChipDisplay;
