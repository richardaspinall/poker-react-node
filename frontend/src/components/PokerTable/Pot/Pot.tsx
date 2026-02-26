import ChipDisplay from '../../Chips/ChipDisplay';

type PotProps = { pot: number };

export default function Pot({ pot }: PotProps) {
  const total = typeof pot === 'number' ? pot : 0;

  return (
    <div id="pot">
      <span className="pot-label">Pot</span>
      <span className="pot-value">{total}</span>
      {total > 0 && <ChipDisplay totalValue={total} className="pot-chip-display" />}
    </div>
  );
}
