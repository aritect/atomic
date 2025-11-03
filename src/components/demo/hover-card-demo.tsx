import React from "react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components-ui-lib/avatar";
import { Button } from "@/components-ui-lib/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components-ui-lib/hover-card";
import { CalendarIcon } from "@/icons-ui-lib/calendar-icon";

const HoverCardDemo = () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@nextjs</Button>
      </HoverCardTrigger>
      <HoverCardContent className="w-72">
        <div className="flex justify-between gap-x-4">
          <Avatar>
            <AvatarImage src="https://github.com/vercel.png" />
            <AvatarFallback>VC</AvatarFallback>
          </Avatar>
          <div>
            <h4 className="mb-1.5 text-sm font-semibold">@nextjs</h4>
            <p className="mb-3 text-sm leading-5">
              The React Framework - created and maintained by @vercel.
            </p>
            <div className="flex items-center">
              <CalendarIcon size={14} className="mr-2 opacity-70" />{" "}
              <span className="text-muted-foreground text-sm">
                Joined December 2021
              </span>
            </div>
          </div>
        </div>
      </HoverCardContent>
    </HoverCard>
);

export { HoverCardDemo };
