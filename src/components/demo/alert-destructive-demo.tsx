import React from "react";

import { Alert, AlertDescription } from "@/components-ui-lib/alert";
import { CircleInfoIcon } from "@/icons-ui-lib/circle-info-icon";

const AlertDestructiveDemo = () => (
    <Alert variant="destructive" className="max-w-lg">
      <CircleInfoIcon size={20} />
      <AlertDescription>
        Use red callouts to give the user an error message.
      </AlertDescription>
    </Alert>
);

export { AlertDestructiveDemo };
