import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { TextUnderlineIcon } from '@hugeicons/core-free-icons';

export const UnderlineIcon = createIconComponent("TextUnderlineIcon", {
  "stroke.rounded": TextUnderlineIcon,
} as Record<string, any>, "stroke");
