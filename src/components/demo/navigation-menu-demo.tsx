import React from "react";

import { Link } from "@/components-ui-lib/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuDropdownItem,
  NavigationMenuDropdownList,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components-ui-lib/navigation-menu";

const NavigationMenuDemo = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
        <Link href="/docs/introduction">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Introduction
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <Link href="/docs/components/primitives/accordion">
          <NavigationMenuLink className={navigationMenuTriggerStyle()}>
            Components
          </NavigationMenuLink>
        </Link>
      </NavigationMenuItem>
      <NavigationMenuItem>
        <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
        <NavigationMenuContent>
          <NavigationMenuDropdownList variant="card">
            <NavigationMenuDropdownItem
              variant="card"
              title="shadcn/ui"
              cardImg="/black-sand.jpg"
              href="https://ui.shadcn.com"
            >
              The component library Atomic is inspired by.
            </NavigationMenuDropdownItem>
            <NavigationMenuDropdownItem
              title="Radix UI"
              href="https://www.radix-ui.com"
            >
              The component library shadcn/ui was built on top of.
            </NavigationMenuDropdownItem>
            <NavigationMenuDropdownItem
              href="https://tailwindcss.com"
              title="Tailwind CSS"
            >
              The easiest and fastest way to write CSS. (in my opinion)
            </NavigationMenuDropdownItem>
          </NavigationMenuDropdownList>
        </NavigationMenuContent>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
);

export { NavigationMenuDemo };
