import React from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components-ui-lib/alert";
import { RocketIcon } from "@/icons-ui-lib/rocket-icon";

const AlertDemo = () => (
    <Alert className="max-w-lg">
      <RocketIcon size={20} />
      <AlertTitle>
        Heads up!
      </AlertTitle>
      <AlertDescription>
        Displays a callout for user attention.
      </AlertDescription>
    </Alert>
);

export { AlertDemo };
