import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { SourceCodeIcon } from '@hugeicons/core-free-icons';

export const CodeArrowsIcon = createIconComponent("SourceCodeIcon", {
  "stroke.rounded": SourceCodeIcon,
} as Record<string, any>, "stroke");
