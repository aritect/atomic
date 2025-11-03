import React from "react";


import { Button } from "@/components-ui-lib/button";
import { useToast } from "@/hooks-ui-lib/use-toast";

const ToastDemo = () => {
  const toast = useToast();

  return (
    <Button
      variant="outline"
      onClick={() => toast("success", "Event has been created", {
        description: "Sunday, December 03, 2023, at 18:00",
        action: {
          label: "Undo",
          onClick: () => {},
        },
      })
      }
    >
      Show Toast
    </Button>
  );
};

export { ToastDemo };
