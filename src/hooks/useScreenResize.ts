"use client";

import { useCallback, useState } from "react";

export function useScreenResize() {
  const [renderedDimention, setRenderedDimention] = useState({
    height: 0,
    width: 0,
  });

  const setRef = useCallback((node: HTMLDivElement) => {
    if (node !== null) {
      handleResize(node);
      window.addEventListener("resize", () => handleResize(node));
    }
  }, []);

  function handleResize(node: HTMLDivElement) {
    const { width, height } = node.getBoundingClientRect();
    setRenderedDimention({ width, height });
  }

  return { renderedDimention, setRef };
}
