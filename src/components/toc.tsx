import React, { type FC } from "react";

import { Link } from "@/components-ui-lib/link";
import { ScrollArea } from "@/components-ui-lib/scroll-area";
import { useActiveId } from "@/hooks-ui-lib/use-active-id";
import type { DocsTocItem } from "@/types/docs";
import { cn } from "@/utils-ui-lib/classnames";

interface TocProps {
  toc: DocsTocItem[];
}

const Toc: FC<TocProps> = ({ toc }) => {
  const activeId = useActiveId({ ids: (toc ?? []).map((item) => item.id) });

  return (
    <div className="z-30 hidden w-60 shrink-0 pr-3 xl:block">
      <div className="sticky bottom-0 top-2 w-full">
        <ScrollArea showScrollbar={false} className="h-full">
          <nav className="grid gap-y-2.5 py-6">
            {toc.map((item) => (
              <Link
                href={`#${item.id}`}
                className={cn(
                  "text-sm",
                  item.id === activeId
                    ? "text-highlight-foreground font-medium"
                    : "text-muted-foreground hover:text-accent-foreground",
                  item.type === "h3" && "ml-6",
                )}
                key={item.id}
              >
                {item.text}
              </Link>
            ))}
          </nav>
        </ScrollArea>
      </div>
    </div>
  );
};

export { Toc };
