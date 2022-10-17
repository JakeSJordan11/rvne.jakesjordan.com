import { useCallback, useEffect, useRef, useState } from "react";

export function useDrag() {
  const isDragging = useRef(false);
  const nodeRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const onPointerDown = useCallback((event: PointerEvent) => {
    if (event.target === nodeRef.current) {
      isDragging.current = true;
      if (isDragging.current && nodeRef.current) {
        nodeRef.current.classList.add("cursor-grabbing");
        setOffset({
          x: event.clientX - nodeRef.current.getBoundingClientRect().left,
          y: event.clientY - nodeRef.current.getBoundingClientRect().top,
        });
      }
    }
  }, []);

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      if (isDragging.current) {
        setPosition({
          x: event.clientX - offset.x,
          y: event.clientY - offset.y,
        });
      }
    },
    [offset]
  );
  const onPointerUp = useCallback(() => {
    if (isDragging.current && nodeRef.current) {
      nodeRef.current.classList.remove("cursor-grabbing");
      nodeRef.current.classList.add("cursor-grab");
      isDragging.current = false;
    }
  }, []);

  useEffect(() => {
    if (nodeRef.current) {
      nodeRef.current.style.transform = `translate(${position.x}px, ${position.y}px)`;
    }
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointerup", onPointerUp);
    document.addEventListener("pointermove", onPointerMove);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointerup", onPointerUp);
      document.removeEventListener("pointermove", onPointerMove);
    };
  }, [onPointerDown, onPointerUp, onPointerMove, position]);

  return { nodeRef };
}
