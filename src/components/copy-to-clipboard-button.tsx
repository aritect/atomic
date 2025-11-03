import React, { type FC } from "react";

import { toast } from "sonner";

import { Button } from "@/components-ui-lib/button";
import { useClipboard } from "@/hooks-ui-lib/use-clipboard";
import { CopyIcon } from "@/icons-ui-lib/copy-icon";

interface CopyToClipboardButtonProps {
  value: string;
}

const CopyToClipboardButton: FC<CopyToClipboardButtonProps> = ({ value }) => {
  const { copyToClipboard } = useClipboard();

  return (
    <Button
      onClick={() => copyToClipboard(
        value,
        () => toast.success("Copied to clipboard."),
        () => toast.error("Failed to copy to clipboard."),
      )
      }
      variant="ghost"
      size="icon"
      aria-label="Copy to clipboard"
      className="absolute right-4 top-4 size-6"
    >
      <CopyIcon size={14} className="text-muted-foreground hover:text-foreground" />
    </Button>
  );
};

export { CopyToClipboardButton };
