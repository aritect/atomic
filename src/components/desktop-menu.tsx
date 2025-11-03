import React, { type FC } from "react";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components-ui-lib/navigation-menu";

const linkStyle = "text-sm font-semibold py-2 m-0 text-muted-foreground hover:text-foreground duration-global data-[active]:text-foreground";

interface DesktopMenuProps {
  pathname: string;
}

const DesktopMenu: FC<DesktopMenuProps> = ({ pathname }) => (
    <NavigationMenu className="hidden md:block">
      <NavigationMenuList className="group flex flex-1 list-none items-center justify-center space-x-8">
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/"
            active={pathname === "/"}
            className={linkStyle}
          >
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            href="/docs/introduction"
            active={pathname === "/docs/introduction"}
            className={linkStyle}
          >
            Introduction
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            active={pathname.startsWith("/docs/components")}
            href="/docs/components/primitives/accordion"
            className={linkStyle}
          >
            Components
          </NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
);

export { DesktopMenu };
