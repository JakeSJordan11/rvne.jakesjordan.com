import type { RefObject } from "react";

export interface CanvasContentProps {
  contentRef?: RefObject<HTMLCanvasElement>;
}
export function CanvasContent({ contentRef }: CanvasContentProps) {
  return (
    <canvas
      ref={contentRef}
      className="p-4 m-4 rounded shadow-lg pointer-events-none shadow-neutral-500 bg-neutral-100"
    />
  );
}
