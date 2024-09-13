import React, { useState, useRef, useEffect } from "react";

const AudioPlayer = () => {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);
  const audioRef = useRef(null);

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

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause(); // Pause the audio
      audioRef.current.currentTime = 0; // Reset the audio to the start
    }
  };

  const handleStart = () => {
    // Clear any existing timeout
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // Set a new timeout to play the audio after 5 seconds
    const id = setTimeout(() => {
      playAudio();
    }, seconds * 1000); // 5000 milliseconds = 5 seconds

    setTimeoutId(id);
    setIsActive(true);
  };

  const handleStop = () => {
    if (timeoutId) {
      clearTimeout(timeoutId);
      setTimeoutId(null);
    }
    stopAudio(); // Also stop the audio if it's playing
    setIsActive(true);
  };

  const handleChange = (event) => {
    setSeconds(parseInt(event.target.value, 10) || 0);
  };

  const handleReset = () => {
    setIsActive(false);
    setSeconds(0);
  };

  return (
    <div>
      <h1>Audio Player</h1>
      <audio ref={audioRef} src="/tone3.mp3" />
      <input type="number" value={seconds} onChange={handleChange} min="0" />
      <button onClick={handleStart}>Play Audio in {seconds} Seconds</button>
      <button onClick={handleStop}>Stop Audio</button>
      <button onClick={handleReset}>Reset</button>
      <div>Time Left: {seconds} seconds</div>
    </div>
  );
};

export default AudioPlayer;
