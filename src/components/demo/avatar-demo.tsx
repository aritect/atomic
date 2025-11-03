import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components-ui-lib/avatar";

const AvatarDemo = () => (
    <Avatar>
      <AvatarImage
        src="https://github.com/alxshelepenok.png"
        alt="@alxshelepenok"
      />
      <AvatarFallback>AL</AvatarFallback>
    </Avatar>
);

export { AvatarDemo };
