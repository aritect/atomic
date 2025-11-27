import React from "react";

import * as Portal from "@radix-ui/react-portal";
import { Toaster as RadToaster } from "sonner";

import { CloseIcon } from "@/icons-ui-lib/close-icon";
import { CircleInfoIcon } from "@/icons-ui-lib/circle-info-icon";
import { CircleCheckIcon } from "@/icons-ui-lib/circle-check-icon";
import { AlertHexagonIcon } from "@/icons-ui-lib/alert-hexagon-icon";

import { useTheme } from "@/hooks-ui-lib/use-theme";

type ToasterProps = React.ComponentProps<typeof RadToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  const [theme] = useTheme();

  return (
    <Portal.Root>
      <RadToaster

        theme={theme as ToasterProps["theme"]}
        className="toaster group"
        icons={{
          success: <CircleCheckIcon variant="solid" />,
          info: <CircleInfoIcon variant="solid" />,
          error: <AlertHexagonIcon variant="solid" />,
          close: <CloseIcon variant="solid" />,
        }}
        toastOptions={{
          classNames: {
            toast:
              "group toast group-[.toaster]:rounded-none group-[.toaster]:border group-[.toaster]:border-toast-border group-[.toaster]:bg-toast-background group-[.toaster]:text-toast-foreground !group-[.toaster]:shadow-sm",
            title: "group-[.toast]:font-normal group-[.toast]:font-sans",
            description: "group-[.toast]:text-toast-muted-foreground group-[.toast]:font-normal group-[.toast]:font-sans",
            actionButton:
              "!leading-[0] !shadow-none !rounded-none !bg-toast-action-button-background hover:!bg-toast-action-button-background !text-toast-action-button-foreground !font-medium !font-sans",
            cancelButton:
              "!leading-[0] !shadow-none !rounded-none !bg-toast-cancel-button-background hover:!bg-toast-cancel-button-background !text-toast-cancel-button-foreground !font-medium !font-sans",
          },
        }}
        {...props}
      />
    </Portal.Root>
  );
};

Toaster.displayName = "Toaster";

export { Toaster };
