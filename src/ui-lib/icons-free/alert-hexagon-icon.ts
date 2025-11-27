import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { SpamIcon } from '@hugeicons/core-free-icons';

export const AlertHexagonIcon = createIconComponent("SpamIcon", {
  "stroke.rounded": SpamIcon,
} as Record<string, any>, "stroke");
