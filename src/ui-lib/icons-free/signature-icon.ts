import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { SignatureIcon as SignatureIconH } from '@hugeicons/core-free-icons';

export const SignatureIcon = createIconComponent("SignatureIcon", {
  "stroke.rounded": SignatureIconH,
} as Record<string, any>, "stroke");
