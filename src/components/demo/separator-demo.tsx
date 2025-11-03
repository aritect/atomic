import React from "react";

import { Separator } from "@/components-ui-lib/separator";

const SeparatorDemo = () => (
    <div>
      <h4 className="mb-2 text-base font-medium">Radix Primitives</h4>
      <p className="text-muted-foreground text-sm">
        An open-source UI component library.
      </p>
      <Separator className="my-4" />
      <div className="flex h-5 items-center gap-x-4 text-sm">
        <div>Blog</div>
        <Separator orientation="vertical" />
        <div>Docs</div>
        <Separator orientation="vertical" />
        <div>Source</div>
      </div>
    </div>
);

export { SeparatorDemo };
