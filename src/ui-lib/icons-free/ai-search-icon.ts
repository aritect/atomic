import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { AiSearchIcon as AiSearchIconH } from '@hugeicons/core-free-icons';

export const AiSearchIcon = createIconComponent("AiSearchIcon", {
  "stroke.rounded": AiSearchIconH,
} as Record<string, any>, "stroke");
