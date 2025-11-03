import React, {
  Children,
  type FC,
  type PropsWithChildren,
  useRef,
  useState,
} from "react";

import highlight from "highlight.js/lib/common";

import { ScrollArea, ScrollBar } from "@/components-ui-lib/scroll-area";
import { useResizeObserver } from "@/hooks-ui-lib/use-resize-observer";
import { cn } from "@/utils-ui-lib/classnames";

import { CopyToClipboardButton } from "./copy-to-clipboard-button";

interface CodeBlockProps {
  language: string;
  className?: string;
  children: React.ReactNode;
}

const CODE_BLOCK_MAX_HEIGHT = 430;

const CodeBlockWrapper: FC<
  PropsWithChildren & {
    className?: string;
  }
> = ({ children, className }) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useResizeObserver(scrollAreaRef, () => {
    if (scrollAreaRef.current) {
      setIsOverflowing(scrollAreaRef.current?.clientHeight >= CODE_BLOCK_MAX_HEIGHT,);
    }
  });

  return (
    <div
      className={cn(
        "bg-border/30 relative overflow-hidden rounded-lg border",
        className,
      )}
    >
      <ScrollArea
        ref={scrollAreaRef}
        className={cn("max-h-[430px] w-[100%]", {
          "h-[430px]": isOverflowing,
        })}
      >
        {children}
        <ScrollBar orientation="horizontal" />
        <ScrollBar orientation="vertical" />
      </ScrollArea>
    </div>
  );
};

const CodeBlock: FC<CodeBlockProps> = ({ language, children, className }) => {
  const codeString = Children.toArray(children).join("");
  const highlightedCode = highlight.highlight(codeString, { language }).value;

  return (
    <CodeBlockWrapper className={className}>
      <pre className="p-4">
        <code
          className={"text-foreground/70 text-sm leading-6"}
          dangerouslySetInnerHTML={{ __html: highlightedCode }}
        />
      </pre>
      <CopyToClipboardButton value={codeString} />
    </CodeBlockWrapper>
  );
};

export { CodeBlockWrapper, CodeBlock };
