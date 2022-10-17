import { useEffect, useRef } from "react";
import { useDrag } from "~/hooks/useDrag";
import { usePath } from "~/hooks/usePath";

interface NodeProps extends React.PropsWithChildren {}

export function GreenNode({ children }: NodeProps) {
  const { nodeRef } = useDrag();
  const { inputRef, outputRef } = usePath();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef?.current;
    if (canvas) {
      canvas.height = 100;
      canvas.width = 150;
    }
    const context = canvas?.getContext("2d");
    if (context) {
      context.arc(
        context.canvas.width / 2,
        context.canvas.height / 2,
        context.canvas.height / 2,
        0,
        2 * Math.PI
      );
      context.fillStyle = "green";
      context.fill();
    }
  }, [canvasRef]);

  useEffect(() => {
    if (outputRef.current && inputRef.current && nodeRef.current) {
      inputRef.current.style.bottom = `${nodeRef.current.clientHeight - 2}px`;
      inputRef.current.style.left = `${nodeRef.current.clientWidth / 2}px`;
      outputRef.current.style.top = `${nodeRef.current.clientHeight - 2}px`;
      outputRef.current.style.left = `${nodeRef.current.clientWidth / 2}px`;
    }
  }, [inputRef, outputRef, nodeRef]);
  return (
    <article
      ref={nodeRef}
      className="absolute bg-white rounded-lg border-4 border-black select-none w-fit cursor-grab touch-none"
    >
      <div
        ref={inputRef}
        className="absolute w-2 h-2 bg-black rounded-full ring-2 ring-white cursor-crosshair"
      />
      <h1 className="text-2xl font-bold text-center pointer-events-none">
        {children}
      </h1>
      <canvas ref={canvasRef} className="p-4 pointer-events-none" />
      <div
        ref={outputRef}
        className="absolute w-2 h-2 bg-black rounded-full ring-2 ring-white cursor-crosshair"
      />
    </article>
  );
}
