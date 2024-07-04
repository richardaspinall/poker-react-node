import React, { useEffect, useState } from 'react';

import './CountdownIndicator.css';

interface CountdownIndicatorProps {
  initialCount: number;
  duration: number;
}

const CountdownIndicator: React.FC<CountdownIndicatorProps> = ({ initialCount, duration }) => {
  const [count, setCount] = useState<number>(initialCount);

  useEffect(() => {
    if (count > 0) {
      const interval = duration / initialCount;
      const id = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, interval);

      return () => clearInterval(id); // Cleanup interval on component unmount
    }
  }, [count, duration, initialCount]);

  const getClipPath = (): string => {
    const percentage = (count / initialCount) * 100;
    return `inset( 0 ${100 - percentage}% 0 0 )`;
  };

  return (
    <div className="countdown-container">
      <div
        className={`countdown-bar ${count > 0 ? 'visible' : ''}`}
        style={{
          clipPath: getClipPath(),
        }}
      ></div>
    </div>
  );
};

export default CountdownIndicator;
