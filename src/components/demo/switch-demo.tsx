import React from "react";

import { Label } from "@/components-ui-lib/label";
import { Switch } from "@/components-ui-lib/switch";

const SwitchDemo = () => (
    <div className="flex items-center gap-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
);

export { SwitchDemo };
