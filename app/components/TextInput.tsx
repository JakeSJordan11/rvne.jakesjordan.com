import { forwardRef } from "react";
import type { ForwardedRef } from "react";

interface TextInpProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string;
}
export const TextInput = forwardRef(function TextInput(
  { onChange, value }: TextInpProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className="p-2 m-4 text-xl font-medium rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 caret-black dark:bg-neutral-200 dark:border-b-neutral-700"
      ref={ref}
      onChange={(e) => onChange(e)}
      value={value}
      placeholder="Enter text"
      data-np-checked
    />
  );
});
