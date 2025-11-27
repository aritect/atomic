import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { AiNetworkIcon as AiNetworkIconH } from '@hugeicons/core-free-icons';

export const AiNetworkIcon = createIconComponent("AiNetworkIcon", {
  "stroke.rounded": AiNetworkIconH,
} as Record<string, any>, "stroke");
