import { MutableRefObject, useContext } from "react";
import { POINTER_ELEMENT_CONTEXT } from "../constants";

export default function usePointerElementRef(): MutableRefObject<Element | null> {
  const context = useContext(POINTER_ELEMENT_CONTEXT);

  if (context === undefined) {
    throw new Error('usePointerElementRef must be used within an PointerElementProvider');
  }

  return context;
}
