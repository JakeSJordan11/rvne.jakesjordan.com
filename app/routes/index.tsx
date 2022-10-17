import { useRef, useState } from "react";
import type { RefObject } from "react";

export default function Index() {
  return (
    <main className="h-screen bg-neutral-50 dark:bg-neutral-800">
      <NodeConsumer />
    </main>
  );
}

enum ContentKind {
  Canvas = "canvas",
  Number = "number",
  Text = "text",
}

export function NodeConsumer() {
  const nodeRef = useRef<HTMLDivElement>(null);
  /* const handleRef = useRef<HTMLButtonElement>(null); */
  const contentRef = useRef<HTMLInputElement | HTMLCanvasElement>(null);
  return (
    <article
      ref={nodeRef}
      className="absolute rounded-lg border-4 select-none border-neutral-700 cursor-grab touch-none bg-neutral-100 dark:bg-neutral-400 dark:border-neutral-100"
    >
      {/* <Handle handleRef={handleRef}></Handle> */}
      <Content
        contentType={ContentKind.Text}
        multiline
        contentRef={contentRef}
      />
    </article>
  );
}

type HandleProps = { handleRef: RefObject<HTMLButtonElement> };
export function Handle({ handleRef }: HandleProps) {
  return (
    <button
      ref={handleRef}
      className="absolute w-2 h-2 rounded-full ring-2 ring-neutral-50 bg-neutral-500 cursor-crosshair dark:bg-neutral-50 dark:ring-neutral-800"
    />
  );
}
export interface ContentProps {
  contentRef?: RefObject<
    HTMLCanvasElement | HTMLTextAreaElement | HTMLInputElement
  >;
  contentType?: ContentKind;
  multiline?: boolean;
}

export function Content({ contentRef, contentType, multiline }: ContentProps) {
  const [numberValue, setNumberValue] = useState<number>(0);

  function handleNumberChange(event: React.ChangeEvent<HTMLInputElement>) {
    setNumberValue(Number(event.currentTarget.value));
  }

  switch (contentType) {
    case ContentKind.Canvas:
      return (
        <canvas
          ref={contentRef as RefObject<HTMLCanvasElement>}
          className="p-4 pointer-events-none"
        />
      );
    case ContentKind.Number:
      return (
        <div className="flex flex-col p-4 space-y-4">
          <input
            className="p-2 text-xl font-medium rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 dark:bg-neutral-200 dark:border-b-neutral-700"
            ref={contentRef as RefObject<HTMLInputElement>}
            type="number"
            value={numberValue}
          />
          <input
            type="range"
            onChange={(event) => handleNumberChange(event)}
            defaultValue={numberValue}
          />
        </div>
      );

    case ContentKind.Text:
      return <TextContent multiline={multiline} contentRef={contentRef} />;

    default:
      return (
        <div className="p-4 font-mono text-xl font-semibold text-center text-red-700">
          <div>no content added</div>
          <div>ad content to complete node</div>
        </div>
      );
  }
}

interface TextContentProps {
  contentRef?: RefObject<
    HTMLCanvasElement | HTMLTextAreaElement | HTMLInputElement
  >;
  multiline?: boolean;
}
export function TextContent({ contentRef, multiline }: TextContentProps) {
  const [stringValue, setStringValue] = useState<string>();

  function handleTextChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    setStringValue(event.currentTarget.value);
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
  }

  function handleTextScroll(event: React.UIEvent<HTMLTextAreaElement>) {
    event.currentTarget.style.height = "auto";
    event.currentTarget.style.height = `${event.currentTarget.scrollHeight}px`;
  }
  if (multiline) {
    return (
      <textarea
        className="p-2 m-4 text-xl font-medium rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 dark:bg-neutral-200 dark:border-b-neutral-700"
        ref={contentRef as RefObject<HTMLTextAreaElement>}
        placeholder="Enter text"
        onChange={(event) => handleTextChange(event)}
        onScroll={(event) => handleTextScroll(event)}
        value={stringValue}
        data-np-checked
      />
    );
  }
  return (
    <input
      className="p-2 m-4 text-xl font-medium rounded border-2 dark:border-0 dark:border-b-2 bg-neutral-50 border-neutral-400 caret-black dark:bg-neutral-200 dark:border-b-neutral-700"
      ref={contentRef as RefObject<HTMLInputElement>}
      placeholder="Enter text"
      onChange={(e) => setStringValue(e.target.value)}
      value={stringValue}
      data-np-checked
    />
  );
}
