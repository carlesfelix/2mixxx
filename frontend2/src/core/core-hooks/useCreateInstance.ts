import { useRef } from "react";

export default function useCreateInstance<Instance extends object>(
  instanceBuilder: () => Instance
): Instance {
  const ref = useRef<Instance | null>(null);
  if (ref.current === null) {
    ref.current = instanceBuilder();
  }
  return ref.current;
}
