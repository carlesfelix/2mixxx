import { FocusEvent, ReactNode } from "react";

export type PointerElementProviderProps = {
  children: ReactNode;
};

export type UseFocusHighlightReturn = {
  focus: (event: FocusEvent) => void;
  blur: () => void;
  isHighlighted: boolean;
};
