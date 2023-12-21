import { useEffect, useRef } from "react";

const usePrevState = (state: string) => {
  const ref = useRef<string | null>(null);

  useEffect(() => {
    ref.current = state;
  });

  return ref.current;
};

export default usePrevState;
