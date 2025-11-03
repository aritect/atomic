import { type ReactNode } from "react";

import { toast as sonner } from "sonner";

type ToastType = "success" | "error" | "warning" | "info";

interface ToastOptions {
  description: string;
  duration?: number;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

const toast = (type: ToastType, title: string, options?: ToastOptions) => {
  sonner[type](title, options);
};

export { toast, type ToastType, type ToastOptions };
