import { useCallback, useEffect, useRef, useState } from "react";

export function usePath() {
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLDivElement>(null);
  const [path, setPath] = useState<SVGPathElement>();
  const [start, setStart] = useState<{ x: number; y: number }>();
  const [isDragging, setIsDragging] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const onPointerOver = useCallback(
    (event: PointerEvent) => {
      if (isDragging && inputRef.current === event.target) {
        inputRef.current?.parentElement?.classList.add("bg-green-300");
        setIsConnected(true);
      }
      if (isDragging && outputRef.current === event.target) {
        outputRef.current?.parentElement?.classList.add("bg-green-300");
        setIsConnected(true);
      }
    },
    [isDragging]
  );

  const onPointerOut = useCallback((event: PointerEvent) => {
    if (event.target === outputRef.current) {
      outputRef.current?.parentElement?.classList.remove("bg-green-300");
      setIsConnected(false);
    }
    if (event.target === inputRef.current) {
      inputRef.current?.parentElement?.classList.remove("bg-green-300");
      setIsConnected(false);
    }
  }, []);

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (event.target === inputRef.current) {
      setIsDragging(true);
      const svg = document.body.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "svg")
      );
      svg.setAttribute("class", "absolute top-0 left-0 h-full w-full -z-10");
      const path = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
      );
      path.style.stroke = "black";
      path.style.strokeWidth = "2";
      path.style.strokeLinecap = "round";
      path.style.fill = "none";
      setPath(path);
      setStart({
        x: inputRef.current!.getBoundingClientRect().x + 4,
        y: inputRef.current!.getBoundingClientRect().y + 4,
      });
    }

    if (event.target === outputRef.current) {
      setIsDragging(true);
      const svg = document.body.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "svg")
      );
      svg.setAttribute("class", "absolute top-0 left-0 h-full w-full -z-10");
      const path = svg.appendChild(
        document.createElementNS("http://www.w3.org/2000/svg", "path")
      );
      path.style.stroke = "black";
      path.style.strokeWidth = "2";
      path.style.strokeLinecap = "round";
      path.style.fill = "none";
      setPath(path);
      setStart({
        x: outputRef.current!.getBoundingClientRect().x + 4,
        y: outputRef.current!.getBoundingClientRect().y + 4,
      });
    }
  }, []);

  const onPointerMove = useCallback(
    (e: PointerEvent) => {
      if (isDragging) {
        path?.setAttribute(
          "d",
          `M${start?.x} ${start?.y} L${e.clientX} ${e.clientY}`
        );
      }
    },
    [start, path, isDragging]
  );

  const onPointerUp = useCallback(
    (event: PointerEvent) => {
      if (!isConnected && path === event.target) {
        path?.parentElement?.remove();
      }
      path?.setAttribute(
        "d",
        `M${outputRef.current!.getBoundingClientRect().x + 4} ${
          outputRef.current!.getBoundingClientRect().y + 4
        } L${inputRef.current!.getBoundingClientRect().x + 4} ${
          inputRef.current!.getBoundingClientRect().y + 4
        }`
      );
      setIsDragging(false);
    },
    [path, isConnected]
  );

  useEffect(() => {
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointerover", onPointerOver);
    document.addEventListener("pointerout", onPointerOut);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
    };
  }, [onPointerDown, onPointerMove, onPointerUp, onPointerOver, onPointerOut]);

  return { inputRef, outputRef };
}
