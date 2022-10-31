import { FocusEvent, useCallback, useState } from "react";
import { UseFocusHighlightReturn } from "../types";
import usePointerElementRef from "./usePointerElementRef";

export default function useFocusHighlight(): UseFocusHighlightReturn {
  const [ isHighlighted, setIsHighlighted ] = useState<boolean>(false);
  const pointerElementRef = usePointerElementRef();

  const focus = useCallback((event: FocusEvent) => {
    if (event.target !== pointerElementRef.current && !event.target.contains(pointerElementRef.current)) {
      setIsHighlighted(true);
    }
  }, [pointerElementRef]);

  const blur = useCallback(() => {
    setIsHighlighted(false);
  }, []);

  return {
    focus,
    blur,
    isHighlighted
  };
}
