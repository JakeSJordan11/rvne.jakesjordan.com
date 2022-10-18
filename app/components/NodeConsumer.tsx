import { useRef } from "react";
import { ContentKind } from "~/components/ContentKind";
import { Content } from "~/components/Content";
import { Handle } from "./Handle";

export function NodeConsumer() {
  const nodeRef = useRef<HTMLDivElement>(null);
  const handleRef = useRef<HTMLButtonElement>(null);
  const contentRef = useRef<
    HTMLInputElement | HTMLCanvasElement | HTMLTextAreaElement
  >(null);

  return (
    <article
      ref={nodeRef}
      className="absolute rounded-lg border-4 select-none border-neutral-700 cursor-grab touch-none bg-neutral-100 dark:bg-neutral-400 dark:border-neutral-100"
    >
      <Handle handleRef={handleRef} input left={50} />
      <Content contentType={ContentKind.Welcome} contentRef={contentRef} />
      <Handle handleRef={handleRef} output left={50} />
    </article>
  );
}
