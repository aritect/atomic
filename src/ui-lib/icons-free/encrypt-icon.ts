import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { EncryptIcon as EncryptIconH } from '@hugeicons/core-free-icons';

export const EncryptIcon = createIconComponent("EncryptIcon", {
  "stroke.rounded": EncryptIconH,
} as Record<string, any>, "stroke");
