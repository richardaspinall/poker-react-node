type PotProps = { pot: number };

export default function Pot({ pot }: PotProps) {
  return (
    <div id="pot" data-chip-count={pot}>
      Pot
    </div>
  );
}
