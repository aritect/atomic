import React from "react";

import { Sheet, SheetContent, SheetTrigger } from "@/components-ui-lib/sheet";
import { MenuIcon } from "@/icons-ui-lib/menu-icon";
import { type DocsItem } from "@/types/docs";

import { Menu } from "./menu";

interface MenuMobileSheetProps {
  pathname: string;
  primitivesMenuItems: DocsItem[];
  compositesMenuItems: DocsItem[];
  chartsMenuItems: DocsItem[];
}

const MenuMobileSheet = ({
  pathname,
  primitivesMenuItems,
  compositesMenuItems,
  chartsMenuItems,
}: MenuMobileSheetProps) => (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <button type="button" className="flex flex-col gap-y-[5px]">
          <MenuIcon size={24} />
        </button>
      </SheetTrigger>
      <SheetContent>
        <Menu
          pathname={pathname}
          primitivesMenuItems={primitivesMenuItems}
          compositesMenuItems={compositesMenuItems}
          chartsMenuItems={chartsMenuItems}
          isMobile
        />
      </SheetContent>
    </Sheet>
);

export { MenuMobileSheet };
