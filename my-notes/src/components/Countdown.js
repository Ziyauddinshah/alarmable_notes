import React, { useState, useEffect, useRef } from "react";

const Countdown = ({ duration }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const [showGif, setShowGif] = useState(false);

  const audioRef = useRef(null);

  useEffect(() => {
    if (timeLeft <= 0) {
      playAudio();
      setShowGif(true);
      return;
    }
    const interval = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((error) => console.error("Error playing audio:", error));
      setTimeout(() => {
        stopAudio();
      }, 6 * 1000);
    }
  };

  const stopAudio = () => {
    if (audioRef.current) {
      setShowGif(false);
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setTimeLeft(0);
    }
  };

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${hours}h:${minutes}m:${secs}s`;
  };

  const handleGif = () => {
    setShowGif(!showGif);
  };

  return (
    <div className="col-md-12">
      <span>{formatTime(timeLeft)}</span>
      {/* <audio ref={audioRef} src="/tone3.mp3" onEnded={handleGif} /> */}
      <audio
        ref={audioRef}
        src="https://opengameart.org/sites/default/files/audio_preview/swing_0.mp3.ogg"
        loop
        onEnded={handleGif}
      />
      {showGif && (
        <img
          style={{ marginTop: 0.3 + "px", opacity: 1 }}
          src="/alarm.gif"
          width={50 + "px"}
          height={48 + "px"}
          alt="Loading..."
        />
      )}
      <button
        type="button"
        className="btn btn-secondary btn-sm ml-2"
        onClick={stopAudio}
      >
        Stop Alarm
      </button>
    </div>
  );
};

export default Countdown;
