import { CSSProperties, useMemo } from 'react';

import './Chip.css';

type ChipDisplayProps = {
  totalValue: number;
  className?: string;
  showTotalLabel?: boolean;
};

type ChipStack = {
  denom: number;
  count: number;
  visibleCount: number;
};

const DENOMINATIONS = [10000, 5000, 1000, 500, 100, 25, 5, 1];
const MAX_STACKS = 6;
const MAX_VISIBLE_PER_STACK = 5;

function buildStacks(total: number): ChipStack[] {
  const stacks: ChipStack[] = [];
  let remaining = Math.max(0, Math.floor(total));

  for (const denom of DENOMINATIONS) {
    if (remaining <= 0) {
      break;
    }

    const count = Math.floor(remaining / denom);
    if (count <= 0) {
      continue;
    }

    stacks.push({
      denom,
      count,
      visibleCount: Math.min(count, MAX_VISIBLE_PER_STACK),
    });

    remaining %= denom;

    if (stacks.length >= MAX_STACKS) {
      break;
    }
  }

  return stacks;
}

function ChipDisplay({ totalValue, className, showTotalLabel = true }: ChipDisplayProps) {
  const normalizedTotal = Math.max(0, Math.floor(totalValue || 0));
  const stacks = useMemo(() => buildStacks(normalizedTotal), [normalizedTotal]);

  if (normalizedTotal <= 0) {
    return null;
  }

  return (
    <div className={`chip-display ${className ?? ''}`.trim()}>
      <div className="chip-stacks">
        {stacks.map((stack) => (
          <div key={`stack-${stack.denom}`} className="chip-stack" title={`${stack.count} x ${stack.denom}`}>
            {Array.from({ length: stack.visibleCount }, (_, index) => (
              <span
                key={`chip-${stack.denom}-${index}`}
                className={`chip-token chip-${stack.denom}`}
                style={{ '--chip-index': index } as CSSProperties}
              />
            ))}
            {stack.count > stack.visibleCount && <span className="chip-count">x{stack.count}</span>}
          </div>
        ))}
      </div>
      {showTotalLabel && <div className="chip-total-label">{normalizedTotal}</div>}
    </div>
  );
}

export default ChipDisplay;
