import React, { Fragment } from "react";

import { ScrollArea } from "@/components-ui-lib/scroll-area";
import { Separator } from "@/components-ui-lib/separator";

const tags = Array.from({ length: 50 }).map((_, i, a) => `v1.2.0-beta.${a.length - i}`,);

const ScrollAreaDemo = () => (
    <ScrollArea className="h-72 w-44 rounded-md border">
      <div className="p-3">
        <h4 className="mb-3 text-sm font-medium">Tags</h4>
        {tags.map((tag, i) => (
          <Fragment key={tag}>
            <div className="text-sm">{tag}</div>
            {i !== tags.length - 1 && <Separator className="my-2" />}
          </Fragment>
        ))}
      </div>
    </ScrollArea>
);

export { ScrollAreaDemo };
