'use client';

import React, { useState, useEffect } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
function ClockDisplay() {
  const [value, setValue] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setValue(new Date()), 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className="overflow-hidden flex justify-center items-center"
      style={{ maxWidth: 200 }}
    >
      <Clock value={value} renderNumbers={true} />
    </div>
  );
}

export default ClockDisplay;
