import React from "react";

import { Checkbox } from "@/components-ui-lib/checkbox";
import { Label } from "@/components-ui-lib/label";

const CheckboxDemo = () => (
    <div className="flex items-center gap-x-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
);

export { CheckboxDemo };
