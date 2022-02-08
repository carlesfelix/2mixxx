import { useEffect, useRef } from "react";

export default function usePrevious<Value = any>(value: Value): Value | undefined {
  const previousValue = useRef<Value>();
  useEffect(() => {
    previousValue.current = value;
  }, [ value ]);
  return previousValue.current;
}
