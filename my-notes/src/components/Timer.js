// src/Timer.js
import React, { useState, useEffect } from "react";

const Timer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else if (!isActive && seconds === 0) {
      clearInterval(interval);
      alert("Time's up!");
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  const handleChange = (event) => {
    setSeconds(parseInt(event.target.value, 10) || 0);
  };

  const handleStart = () => {
    setIsActive(true);
  };

  const handleStop = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div>
      <h4>Countdown Timer</h4>
      <input type="number" value={seconds} onChange={handleChange} min="0" />
      <button onClick={handleStart}>Start</button>
      <button onClick={handleStop}>Stop</button>
      <button onClick={handleReset}>Reset</button>
      <div>Time Left: {seconds} seconds</div>
    </div>
  );
};

export default Timer;
