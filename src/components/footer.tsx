import React, { type FC } from "react";

import { Button } from "@/components-ui-lib/button";
import { Link } from "@/components-ui-lib/link";
import { ChevronLeftIcon } from "@/icons-ui-lib/chevron-left-icon";
import { ChevronRightIcon } from "@/icons-ui-lib/chevron-right-icon";

interface FooterProps {
  previousLabel?: string;
  previousHref?: string;
  nextLabel?: string;
  nextHref?: string;
}

const Footer: FC<FooterProps> = ({
  previousLabel,
  previousHref,
  nextLabel,
  nextHref,
}) => (
    <footer className="mt-[72px] flex justify-between">
      {previousLabel && previousHref ? (
        <Button
          variant="ghost"
          className="text-foreground/80 hover:text-foreground p-0 hover:bg-transparent"
        >
          <Link href={previousHref} className="flex items-center gap-x-1.5">
            <ChevronLeftIcon size={18} />
            {previousLabel}
          </Link>
        </Button>
      ) : (
        <div />
      )}
      {nextLabel && nextHref ? (
        <Button
          variant="ghost"
          className="text-foreground/80 hover:text-foreground p-0 hover:bg-transparent"
        >
          <Link href={nextHref} className="flex items-center gap-x-1.5">
            {nextLabel}
            <ChevronRightIcon size={18} />
          </Link>
        </Button>
      ) : (
        <div />
      )}
    </footer>
);

export { Footer };
