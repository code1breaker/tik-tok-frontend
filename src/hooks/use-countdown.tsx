import { useEffect, useRef, useState } from "react";

const useCountdown = ({ initialTime = 30 }) => {
  const [timer, setTimer] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!isRunning) return;
    if (timer === 0) {
      setIsRunning(false);
      return;
    }

    timerRef.current = setTimeout(() => {
      setTimer((prev) => prev - 1);
    }, 1000);

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [timer, isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    setTimer(initialTime);
  };

  return { timer, startTimer, isRunning };
};

export default useCountdown;
