import type { RefObject } from "react";

export type HandleProps = {
  handleRef: RefObject<HTMLButtonElement>;
  input?: boolean;
  output?: boolean;
  amount?: number;
  left?: number;
};
export function Handle({ handleRef, input, output, left }: HandleProps) {
  return (
    <button
      className="absolute w-2 h-2 rounded-full ring-2 ring-neutral-50 bg-neutral-500 cursor-crosshair dark:bg-neutral-50 dark:ring-neutral-800"
      ref={handleRef}
      style={{
        top: input ? "-6px" : "auto",
        bottom: output ? "-6px" : "auto",
        left: `${left}%`,
        transform: "translateX(-50%)",
      }}
    />
  );
}
