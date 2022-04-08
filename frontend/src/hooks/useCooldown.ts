import { useEffect, useRef, useState } from "react";
import { getTimestamp } from "../helpers/date";

export default function useCooldown(
  date: number | string | Date,
  tickInterval: number = 1000
): number {
  const intervalId = useRef<NodeJS.Timer>();
  const [remaining, setRemaining] = useState(() => {
    const newValue = getTimestamp(date) - Date.now();
    return newValue > 0 ? newValue : 0;
  });
  useEffect(() => {
    function startTimer(ts: number) {
      resetTimer();
      intervalId.current = setInterval(tick, tickInterval, ts);
      tick(ts);
    }

    function resetTimer() {
      if (intervalId.current) {
        clearInterval(intervalId.current);
        intervalId.current = undefined;
      }
    }

    function tick(ts: number) {
      if (shouldTick(ts)) {
        const tsDiff = getTsDiff(ts);
        setRemaining(tsDiff);
      } else {
        resetTimer();
        setRemaining(0);
      }
    }

    function getTsDiff(ts: number) {
      return ts - Date.now();
    }

    function shouldTick(ts: number) {
      return getTsDiff(ts) > 0;
    }
    const timestamp = getTimestamp(date);
    if (shouldTick(timestamp)) {
      startTimer(timestamp);
    }
  }, [date, tickInterval]);

  return remaining;
}
