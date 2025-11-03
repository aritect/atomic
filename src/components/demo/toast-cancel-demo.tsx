import React from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";

const ToastCancelDemo = () => (
    <Button
      variant="outline"
      onClick={() => toast("Account created.", {
        cancel: {
          label: "Undo",
          onClick: () => {},
        },
      })
      }
    >
      Show Toast
    </Button>
);

export { ToastCancelDemo };
