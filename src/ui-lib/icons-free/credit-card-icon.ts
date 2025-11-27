import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { CreditCardIcon as CreditCardIconH } from '@hugeicons/core-free-icons';

export const CreditCardIcon = createIconComponent("CreditCardIcon", {
  "stroke.rounded": CreditCardIconH,
} as Record<string, any>, "stroke");
