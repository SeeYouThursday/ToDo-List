'use client';

import React, { useState, useEffect } from 'react';

function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatTime = (value: number) => (value < 10 ? `0${value}` : value);

  const hours = formatTime(time.getHours());
  const minutes = formatTime(time.getMinutes());
  const seconds = formatTime(time.getSeconds());

  return (
    <div id="app">
      <div id="timer">
        <div id="timer-text">
          <div className="timer-char">{hours}</div>
          <div className="timer-char colon">:</div>
          <div className="timer-char">{minutes}</div>
          <div className="timer-char colon">:</div>
          <div className="timer-char">{seconds}</div>
        </div>
      </div>
    </div>
  );
}

export default Clock;
