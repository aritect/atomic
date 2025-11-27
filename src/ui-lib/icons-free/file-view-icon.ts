import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { FileViewIcon as FileViewIconH } from '@hugeicons/core-free-icons';

export const FileViewIcon = createIconComponent("FileViewIcon", {
  "stroke.rounded": FileViewIconH,
} as Record<string, any>, "stroke");
