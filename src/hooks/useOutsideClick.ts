import { useEffect, useRef } from "react";

export function useOutsideClick(
  handler: () => void,
  onCapture: boolean = true,
) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(
    function () {
      function handleClick(e: MouseEvent) {
        if (ref.current && !ref.current.contains(e.target as Node)) {
          console.log("Click outside");
          handler();
        }
      }

      addEventListener("click", handleClick, onCapture);

      return () => removeEventListener("click", handleClick, onCapture);
    },
    [handler, onCapture],
  );

  return { ref };
}
