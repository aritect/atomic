import React from "react";

import { Button } from "@/components-ui-lib/button";
import { Link } from "@/components-ui-lib/link";
import { DEMO } from "@/constants/demo";
import { ArrowRightIcon } from "@/icons-ui-lib/arrow-right-icon";
import { cn } from "@/utils-ui-lib/classnames";

const renderDemoItem = (id: string, href: string, Component: React.ComponentType) => (
  <div
    key={id}
    className={cn(
      "duration-global group relative flex h-[420px] items-center justify-center rounded-lg border border-opacity-80 p-6 transition-colors",
      "md:hover:border-border md:hover:bg-accent/30",
    )}
  >
    <Button
      asChild
      size="icon"
      variant="outline"
      className={cn(
        "absolute right-4 top-4 transition-opacity",
        "md:pointer-events-none md:opacity-0",
        "md:group-hover:pointer-events-auto md:group-hover:opacity-100",
      )}
    >
      <Link href={href}>
        <ArrowRightIcon size={20} />
      </Link>
    </Button>
    <Component />
  </div>
);

const DemosGrid = () => {
  return (
    <section className="container-docs">
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 md:px-3 xl:grid-cols-3">
        {DEMO.map(({ id, href, Component }) => renderDemoItem(id, href, Component))}
      </div>
    </section>
  );
};

export { DemosGrid };
