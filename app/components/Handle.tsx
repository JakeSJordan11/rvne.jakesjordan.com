import type { RefObject } from "react";

type HandleProps = { handleRef: RefObject<HTMLButtonElement> };
export function Handle({ handleRef }: HandleProps) {
  return (
    <button
      ref={handleRef}
      className="absolute w-2 h-2 rounded-full ring-2 ring-neutral-50 bg-neutral-500 cursor-crosshair dark:bg-neutral-50 dark:ring-neutral-800"
    />
  );
}
