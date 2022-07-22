import { useCallback, useEffect, useRef } from "react";

type ObjectUrlItem = {
  url: string;
  revokeOnUnmount: boolean;
};
export default function useObjectUrl() {
  const objectUrls = useRef<ObjectUrlItem[]>([]);
  useEffect(() => {
    return () => {
      objectUrls.current.forEach(objectUrl => {
        if (objectUrl.revokeOnUnmount) {
          URL.revokeObjectURL(objectUrl.url);
        }
      });
    };
  }, [ objectUrls ]);
  const createObjectURL = useCallback(function(
    obj: Blob | MediaSource,
    revokeOnUnmount: boolean = true
  ): string {
    const url = URL.createObjectURL(obj);
    objectUrls.current = [
      ...objectUrls.current,
      { url, revokeOnUnmount }
    ];
    return url;
  }, [ objectUrls ]);

  const revokeObjectURL = useCallback(function(url: string): void {
    URL.revokeObjectURL(url);
    objectUrls.current = objectUrls.current.filter(
      ({ url: oldUrl }) => oldUrl !== url
    );
  }, [ objectUrls ]);

  return { createObjectURL, revokeObjectURL };
}
