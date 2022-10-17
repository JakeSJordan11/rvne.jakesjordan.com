import { forwardRef } from "react";
import type { ForwardedRef } from "react";

export interface NumberInputProps {
  value: number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}
export const NumberInput = forwardRef(function NumberInput(
  { value, onChange }: NumberInputProps,
  ref: ForwardedRef<HTMLInputElement>
) {
  return (
    <input
      className="p-2 text-xl font-medium rounded border-2 appearance-none pointer-events-none dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 dark:bg-neutral-200 dark:border-b-neutral-700"
      ref={ref}
      type="number"
      onChange={onChange}
      value={value}
      data-np-checked
    />
  );
});
