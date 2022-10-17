import type { RefObject } from "react";
import { ContentKind } from "~/components/ContentKind";
import { CanvasContent } from "~/components/CanvasContent";
import { NumberContent } from "~/components/NumberContent";
import { TextContent } from "~/components/TextContent";
import { MissingContent } from "~/components/MissingContent";
import { WelcomeContent } from "~/components/WelcomeContent";

export interface ContentProps {
  contentRef?: RefObject<
    HTMLInputElement | HTMLCanvasElement | HTMLTextAreaElement
  >;
  contentType?: ContentKind;
  multiline?: boolean;
}

export function Content({ contentRef, contentType, multiline }: ContentProps) {
  switch (contentType) {
    case ContentKind.Canvas:
      return (
        <CanvasContent
          contentRef={contentRef as RefObject<HTMLCanvasElement>}
        />
      );

    case ContentKind.Number:
      return (
        <NumberContent contentRef={contentRef as RefObject<HTMLInputElement>} />
      );

    case ContentKind.Text:
      return (
        <TextContent
          multiline={multiline}
          contentRef={
            contentRef as RefObject<HTMLTextAreaElement | HTMLInputElement>
          }
        />
      );

    case undefined:
      return <MissingContent />;

    case ContentKind.Welcome:
      return <WelcomeContent />;
  }
}
