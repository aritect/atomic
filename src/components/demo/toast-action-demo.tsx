import React from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";

const ToastActionDemo = () => (
    <Button
      variant="outline"
      onClick={() => toast("Account added.", {
        action: {
          label: "View Account",
          onClick: () => {},
        },
      })
      }
    >
      Show Toast
    </Button>
);

export { ToastActionDemo };
