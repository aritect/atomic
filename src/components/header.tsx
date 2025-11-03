import React, { type FC } from "react";

import { Link } from "@/components-ui-lib/link";
import { ModeToggle } from "@/components-ui-lib/mode-toggle";
import { META } from "@/constants/meta";
import { type DocsItem } from "@/types/docs";

import { DesktopMenu } from "./desktop-menu";
import { Logo } from "./logo";
import { MenuMobileSheet } from "./menu-mobile-sheet";

interface HeaderProps {
  pathname: string;
  chartsMenuItems?: DocsItem[];
  primitivesMenuItems?: DocsItem[];
  compositesMenuItems?: DocsItem[];
}

const Header: FC<HeaderProps> = ({
  pathname,
  primitivesMenuItems,
  compositesMenuItems,
  chartsMenuItems,
}) => (
    <header className="md:h-18 top-0 z-50 h-16">
      <div className="container-docs flex h-full items-center justify-between">
        <div className="flex items-center gap-x-6 md:pl-3">
          <Link href="/">
            <Logo name={META.title} />
          </Link>
        </div>
        <div className="flex items-center gap-x-8 md:pr-3">
          <DesktopMenu pathname={pathname} />
          <ModeToggle />
          {pathname
            && primitivesMenuItems
            && compositesMenuItems
            && chartsMenuItems && (
              <MenuMobileSheet
                pathname={pathname}
                primitivesMenuItems={primitivesMenuItems}
                compositesMenuItems={compositesMenuItems}
                chartsMenuItems={chartsMenuItems}
              />
          )}
        </div>
      </div>
    </header>
);

export { Header };
