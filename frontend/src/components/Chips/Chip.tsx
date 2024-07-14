import React from 'react';

import './Chip.css';

interface ChipProps {
  value: number;
  style?: React.CSSProperties;
}

function Chip({ value, style }: ChipProps) {
  return (
    <div className={`chip chip-${value}`} style={style}>
      <span className="chip-value">{value}</span>
    </div>
  );
}

export default Chip;
