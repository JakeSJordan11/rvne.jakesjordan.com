import { forwardRef } from "react";
import type { ForwardedRef } from "react";

interface TextAreaProps {
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onScroll: (event: React.UIEvent<HTMLTextAreaElement>) => void;
}
export const TextArea = forwardRef(function TextArea(
  { value, onChange, onScroll }: TextAreaProps,
  ref: ForwardedRef<HTMLTextAreaElement>
) {
  return (
    <textarea
      className="p-2 m-4 text-xl font-medium rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 dark:bg-neutral-200 dark:border-b-neutral-700"
      ref={ref}
      placeholder="Enter text"
      onChange={(event) => onChange(event)}
      onScroll={(event) => onScroll(event)}
      value={value}
      data-np-checked
    />
  );
});
