import React from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";

const ToastLoadingDemo = () => (
    <Button
      variant="outline"
      onClick={() => toast.loading("Loading accounts...", {
        cancel: {
          label: "Cancel",
          onClick: () => {},
        },
      })
      }
    >
      Show Toast
    </Button>
);

export { ToastLoadingDemo };
