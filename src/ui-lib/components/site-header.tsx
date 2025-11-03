import React from "react";

import { cn } from "@/utils-ui-lib/classnames";

import { Link } from "./link";

interface SiteHeaderProps {
  siteName: string;
  linkComponent?: React.ComponentType<React.ComponentPropsWithoutRef<"a">>;
  menu?: {
    href: string;
    title: string;
    active?: boolean;
  }[];
  logo?: React.ReactNode;
  rightItems?: React.ReactNode;
}

const SiteHeader = ({
  siteName,
  menu,
  logo,
  rightItems,
  linkComponent: LinkComponent = Link,
}: SiteHeaderProps) => (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4">
        <LinkComponent
          href="/"
          className="mr-2 flex items-center md:mr-6 md:space-x-2"
        >
          {logo && (
            <div className="size-4" aria-hidden="true">
              {logo}
            </div>
          )}
          <span className="hidden font-bold md:inline-block">{siteName}</span>
        </LinkComponent>
        <nav className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {(menu || []).map((item, index) => (
            <LinkComponent
              key={index}
              href={item.href}
              className={cn(
                "hover:text-foreground/80 duration-global flex items-center text-sm font-medium transition-colors",
                item.active ? "text-foreground" : "text-foreground/60",
              )}
            >
              {item.title}
            </LinkComponent>
          ))}
        </nav>
        <div className="flex items-center">{rightItems}</div>
      </div>
    </header>
);

export { SiteHeader };
