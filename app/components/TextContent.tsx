import { useState } from "react";
import type { RefObject } from "react";
import { TextArea } from "~/components/TextArea";
import { TextInput } from "~/components/TextInput";

interface TextContentProps {
  contentRef?: RefObject<HTMLTextAreaElement | HTMLInputElement>;
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

  return multiline ? (
    <TextArea
      ref={contentRef as RefObject<HTMLTextAreaElement>}
      onChange={(event) => handleTextChange(event)}
      onScroll={(event) => handleTextScroll(event)}
      value={stringValue}
    />
  ) : (
    <TextInput
      ref={contentRef as RefObject<HTMLInputElement>}
      onChange={(e) => setStringValue(e.target.value)}
      value={stringValue}
    />
  );
}
