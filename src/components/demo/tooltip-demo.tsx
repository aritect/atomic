import React from "react";

import { Button } from "@/components-ui-lib/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components-ui-lib/tooltip";

const TooltipDemo = () => {
  return (
    <>
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
    </>
  );
};

export { TooltipDemo };
