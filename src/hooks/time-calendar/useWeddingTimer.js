import { useEffect, useState } from "react";

const WEDDING_DATE = new Date(2027, 7, 14, 19, 30, 0);
// Месяцы в JavaScript начинаются с 0:
// 7 = август. Дата: 14 августа 2027, 19:30.

const getTimeData = () => {
  const now = new Date();
  const difference = now.getTime() - WEDDING_DATE.getTime();

  const isWeddingPassed = difference >= 0;
  const totalSeconds = Math.floor(Math.abs(difference) / 1000);

  return {
    isWeddingPassed,
    days: Math.floor(totalSeconds / 86400),
    hours: Math.floor((totalSeconds % 86400) / 3600),
    minutes: Math.floor((totalSeconds % 3600) / 60),
    seconds: totalSeconds % 60,
  };
};

const useWeddingTimer = () => {
  const [time, setTime] = useState(getTimeData);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeData());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return time;
};

export default useWeddingTimer;
