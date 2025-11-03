import React from "react";

import { AspectRatio } from "@/components-ui-lib/aspect-ratio";
import { Image } from "@/components-ui-lib/image";

const AspectRatioDemo = () => (
    <AspectRatio ratio={16 / 9} className="bg-muted overflow-hidden rounded-md">
      <Image
        src="/black-sand.jpg"
        className="absolute inset-0 h-full w-full object-cover"
      />
    </AspectRatio>
);

export { AspectRatioDemo };
