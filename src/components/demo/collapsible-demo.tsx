import React, { useState } from "react";

import { Button } from "@/components-ui-lib/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components-ui-lib/collapsible";
import { UnfoldLessIcon } from "@/icons-ui-lib/unfold-less-icon";
import { UnfoldMoreIcon } from "@/icons-ui-lib/unfold-more-icon";

const CollapsibleDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Collapsible
      open={isOpen}
      onOpenChange={setIsOpen}
      className="flex w-full max-w-[350px] flex-col gap-y-2"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-foreground text-sm font-medium">
          @peduarte starred 3 repositories
        </h4>
        <CollapsibleTrigger asChild>
          <Button variant="ghost" size="icon" className="size-7 rounded-md">
            {isOpen ? (
              <UnfoldLessIcon size={16} />
            ) : (
              <UnfoldMoreIcon size={16} />
            )}
            <span className="sr-only">Toggle</span>
          </Button>
        </CollapsibleTrigger>
      </div>
      <div className="rounded-md border px-4 py-2 font-mono text-sm">
        @radix-ui/primitives
      </div>
      <CollapsibleContent className="flex flex-col gap-y-2">
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @radix-ui/colors
        </div>
        <div className="rounded-md border px-4 py-2 font-mono text-sm">
          @stitches/react
        </div>
      </CollapsibleContent>
    </Collapsible>
  );
};

export { CollapsibleDemo };
