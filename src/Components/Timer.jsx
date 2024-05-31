import React, { useEffect, useState } from "react";

export const Timer = () => {
  const [seconds, setSeconds] = useState(900);

  useEffect(() => {
    if (seconds > 0) {
      const timerId = setInterval(() => setSeconds(seconds - 1), 1000);
      return () => clearInterval(timerId);
    }
  }, [seconds]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };

  return (
    <div>
      <p style={{ fontSize: "20px" }}>{formatTime(seconds)}</p>
    </div>
  );
};
