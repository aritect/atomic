import React from "react";

import { Toggle } from "@/components-ui-lib/toggle";
import { BoldIcon } from "@/icons-ui-lib/bold-icon";

const ToggleDemo = () => (
    <Toggle aria-label="Toggle bold">
      <BoldIcon size={16} />
    </Toggle>
);

export { ToggleDemo };
