import React from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";

const ToastErrorDemo = () => (
    <Button
      variant="outline"
      onClick={() => toast.error("Failed to create account.")}
    >
      Show Toast
    </Button>
);

export { ToastErrorDemo };
