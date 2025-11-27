import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CodeIcon as CodeIconH } from '@hugeicons/core-free-icons';

export const CodeIcon = createIconComponent("CodeIcon", {
  "stroke.rounded": CodeIconH,
} as Record<string, any>, "stroke");
