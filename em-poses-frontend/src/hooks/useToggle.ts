import { useCallback, useState } from 'react';

export default function useToggle(initialState: boolean | (() => boolean)): [ boolean, () => void ] {
  const [ toggle, setToggle ] = useState<boolean>(
    typeof initialState === 'function' ? initialState() : initialState
  );
  const toggleFn = useCallback(() => {
    setToggle(old => !old);
  }, []);
  return [ toggle, toggleFn ];
}
