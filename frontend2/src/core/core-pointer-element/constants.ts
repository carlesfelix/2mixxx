import { createContext, MutableRefObject } from "react";

export const POINTER_ELEMENT_CONTEXT = createContext<MutableRefObject<Element | null> | undefined>(undefined);
