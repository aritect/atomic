import React from "react";

import { Badge } from "@/components-ui-lib/badge";

const BadgeOutlineDemo = () => (
  <div className="flex flex-col gap-y-2">
    <div className="flex gap-x-2">
      <Badge variant="outline-default">Badge</Badge>
      <Badge variant="outline-neutral">Badge</Badge>
      <Badge variant="outline-warning">Badge</Badge>
      <Badge variant="outline-destructive">Badge</Badge>
      <Badge variant="outline-positive">Badge</Badge>
    </div>
    <div className="flex gap-x-2">
      <Badge variant="outline-default-rounded">Badge</Badge>
      <Badge variant="outline-neutral-rounded">Badge</Badge>
      <Badge variant="outline-warning-rounded">Badge</Badge>
      <Badge variant="outline-destructive-rounded">Badge</Badge>
      <Badge variant="outline-positive-rounded">Badge</Badge>
    </div>
  </div>
);

export { BadgeOutlineDemo };
