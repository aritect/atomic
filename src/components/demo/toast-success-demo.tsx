import React from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";

const ToastSuccessDemo = () => (
    <Button
      variant="outline"
      onClick={() => toast.success("Account created successfully!")}
    >
      Show Toast
    </Button>
);

export { ToastSuccessDemo };
