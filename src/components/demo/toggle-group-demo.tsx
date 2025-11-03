import React from "react";

import { ToggleGroup, ToggleGroupItem } from "@/components-ui-lib/toggle-group";
import { BoldIcon } from "@/icons-ui-lib/bold-icon";
import { ItalicIcon } from "@/icons-ui-lib/italic-icon";
import { UnderlineIcon } from "@/icons-ui-lib/underline-icon";

const ToggleGroupDemo = () => (
    <ToggleGroup type="multiple">
      <ToggleGroupItem value="bold" aria-label="Toggle bold">
        <BoldIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="italic" aria-label="Toggle italic">
        <ItalicIcon size={16} />
      </ToggleGroupItem>
      <ToggleGroupItem value="strikethrough" aria-label="Toggle strikethrough">
        <UnderlineIcon size={16} />
      </ToggleGroupItem>
    </ToggleGroup>
);

export { ToggleGroupDemo };
