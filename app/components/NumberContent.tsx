import { useState } from "react";
import type { RefObject } from "react";
import { NumberInput } from "~/components/NumberInput";
import { Slider } from "~/components/Slider";

export interface NumberContentProps {
  contentRef?: RefObject<HTMLInputElement>;
}
export function NumberContent({ contentRef }: NumberContentProps) {
  const [value, setValue] = useState<number>(0);
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(parseInt(event.currentTarget.value));
  }
  return (
    <div className="flex flex-col p-4 space-y-4">
      <NumberInput ref={contentRef} onChange={handleChange} value={value} />
      <Slider onChange={handleChange} defaultValue={value} />
    </div>
  );
}
