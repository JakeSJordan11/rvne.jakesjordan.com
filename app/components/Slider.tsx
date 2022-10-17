interface SliderProps {
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  defaultValue?: number;
}
export function Slider({ onChange, defaultValue }: SliderProps) {
  return (
    <input
      className="h-0 rounded-full border ring-1 appearance-none border-neutral-100 ring-neutral-800"
      type="range"
      onChange={onChange}
      defaultValue={defaultValue}
      data-np-checked
    />
  );
}
