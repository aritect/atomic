import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { TelegramIcon as TelegramIconH } from '@hugeicons/core-free-icons';

export const TelegramIcon = createIconComponent("TelegramIcon", {
  "stroke.rounded": TelegramIconH,
} as Record<string, any>, "stroke");
