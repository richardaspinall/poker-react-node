import './Chip.css';

const Chip = ({ value, index }) => {
  return (
    <div className={`chip chip-${value} chip-index-${index}`}>
      <span className="chip-value">{value}</span>
    </div>
  );
};

export default Chip;
