import { useEffect, useState } from "react";

export default function useOverlayRootElementHOH(overlayRootId: string) {
  const overlayRoot = window.document.getElementById(overlayRootId);
  if (overlayRoot === null) {
    throw new Error(`Element with id "${overlayRootId}" must be present in the DOM`);
  }

  return function useOverlayRootElement(): HTMLDivElement {
    const [ el ] = useState<HTMLDivElement>(() => {
      const initialEl = window.document.createElement('div');
      return initialEl;
    });
  
    useEffect(() => {
      overlayRoot.appendChild(el);
      return () => {
        overlayRoot.removeChild(el);
      };
    }, [ el ]);
    return el;
  }
}
