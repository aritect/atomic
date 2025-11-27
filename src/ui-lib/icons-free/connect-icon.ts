import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { ConnectIcon as ConnectIconH } from '@hugeicons/core-free-icons';

export const ConnectIcon = createIconComponent("ConnectIcon", {
  "stroke.rounded": ConnectIconH,
} as Record<string, any>, "stroke");
