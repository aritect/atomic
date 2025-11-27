import { createIconComponent } from "@/utils-ui-lib/create-icon-component";
import { PaintBucketIcon as PaintBucketIconH } from '@hugeicons/core-free-icons';

export const PaintBucketIcon = createIconComponent("PaintBucketIcon", {
  "stroke.rounded": PaintBucketIconH,
} as Record<string, any>, "stroke");
