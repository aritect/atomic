import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { FireIcon as FireIconH } from '@hugeicons/core-free-icons';

export const FireIcon = createIconComponent("FireIcon", {
  "stroke.rounded": FireIconH,
} as Record<string, any>, "stroke");
