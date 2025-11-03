import React, { type FC } from "react";

import { ScrollArea } from "@/components-ui-lib/scroll-area";
import { type DocsItem } from "@/types/docs";
import { cn } from "@/utils-ui-lib/classnames";

import { MenuSection } from "./menu-section";

interface MenuProps {
  primitivesMenuItems: DocsItem[];
  compositesMenuItems: DocsItem[];
  chartsMenuItems: DocsItem[];
  isMobile?: boolean;
  pathname: string;
}

const Menu: FC<MenuProps> = ({
  primitivesMenuItems,
  chartsMenuItems,
  compositesMenuItems,
  isMobile,
  pathname,
}) => (
    <aside
      className={cn(isMobile
        ? "h-full"
        : "absolute h-[100vh] min-h-full bottom-0 left-auto top-0 z-30 hidden w-60 md:block",)}
    >
      <ScrollArea showScrollbar={false} className="h-full">
        <nav
          className={cn("grid gap-y-8", isMobile ? "pb-4 pt-0" : "pb-12 pt-6 pl-3")}
        >
          <MenuSection
            isVisible
            pathname={pathname}
            title="Primitives"
            items={primitivesMenuItems}
            isMobile={isMobile}
          />
          <MenuSection
            isVisible
            pathname={pathname}
            title="Composites"
            items={compositesMenuItems}
            isMobile={isMobile}
          />
          <MenuSection
            isVisible
            pathname={pathname}
            title="Charts"
            items={chartsMenuItems}
            isMobile={isMobile}
          />
        </nav>
      </ScrollArea>
    </aside>
);

export { Menu };
