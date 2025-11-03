import React, { useCallback, useMemo } from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components-ui-lib/breadcrumb";
import { Button } from "@/components-ui-lib/button";
import { Link } from "@/components-ui-lib/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components-ui-lib/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components-ui-lib/tooltip";
import { PanelLeftIcon } from "@/icons-ui-lib/panel-left-icon";

export interface DashboardViewLocation {
  pathname: string;
  search?: string;
}

export interface DashboardViewMenuItem {
  id: string;
  name: string;
  href: string;
  icon: (active: boolean) => React.ReactNode;
  position?: "top" | "bottom";
}

export interface DashboardViewBreadcrumbsItem {
  id: string;
  name: string;
  href?: string;
}

export interface DashboardViewProps {
  name: string;
  logo: React.ReactNode;
  menu: DashboardViewMenuItem[];
  children: React.ReactNode;
  breadcrumbs?: DashboardViewBreadcrumbsItem[];
  location: DashboardViewLocation;
  actions?: React.ReactNode;
  linkComponent?: React.ComponentType<React.ComponentPropsWithoutRef<"a">>;
}

const DashboardView: React.FC<DashboardViewProps> = ({
  name,
  menu,
  logo,
  actions,
  children,
  location,
  breadcrumbs,
  linkComponent: LinkComponent = Link,
}) => {
  const isActiveMenuItem = useCallback(
    (href: string) => location.pathname === href,
    [location.pathname],
  );

  const filterMenuItems = useCallback(
    (position: "top" | "bottom") => menu?.filter((item) => item.position === position) ?? [],
    [menu],
  );

  const topLeftMenu = useMemo(() => filterMenuItems("top"), [filterMenuItems]);
  const bottomLeftMenu = useMemo(
    () => filterMenuItems("bottom"),
    [filterMenuItems],
  );

  return (
    <div className="flex min-h-screen w-full flex-col">
      <aside className="bg-background fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <LinkComponent
            href="#"
            className="bg-primary text-primary-foreground group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:h-8 md:w-8 md:text-base"
          >
            {logo}
            <span className="sr-only">{name}</span>
          </LinkComponent>
          {topLeftMenu.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <LinkComponent
                  href={item.href}
                  className={`${
                    isActiveMenuItem(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } duration-global flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                >
                  <div className="flex h-5 w-5 items-center">{item.icon(isActiveMenuItem(item.href))}</div>
                  <span className="sr-only">{item.name}</span>
                </LinkComponent>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
        <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
          {bottomLeftMenu.map((item) => (
            <Tooltip key={item.id}>
              <TooltipTrigger asChild>
                <LinkComponent
                  href={item.href}
                  className={`${
                    isActiveMenuItem(item.href)
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  } duration-global flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8`}
                >
                  <div className="flex h-5 w-5 items-center">{item.icon(isActiveMenuItem(item.href))}</div>
                  <span className="sr-only">{item.name}</span>
                </LinkComponent>
              </TooltipTrigger>
              <TooltipContent side="right">{item.name}</TooltipContent>
            </Tooltip>
          ))}
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="bg-background sticky top-0 z-30 flex h-14 items-center gap-4 border-b px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeftIcon className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <LinkComponent
                  href="#"
                  className="bg-primary text-primary-foreground group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full text-lg font-semibold md:text-base"
                >
                  {logo}
                  <span className="sr-only">{name}</span>
                </LinkComponent>
                {menu.map((item) => (
                  <LinkComponent
                    key={item.id}
                    href={item.href}
                    className={`${
                      isActiveMenuItem(item.href)
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    } flex items-center gap-4 px-2.5`}
                  >
                    {item.icon(isActiveMenuItem(item.href))}
                    {item.name}
                  </LinkComponent>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <Breadcrumb className="hidden md:flex">
            <BreadcrumbList>
              {breadcrumbs?.map((item, index) => (
                <BreadcrumbItem key={item.id}>
                  {item.href ? (
                    <BreadcrumbLink asChild>
                      <LinkComponent href={item.href}>
                        {item.name}
                      </LinkComponent>
                    </BreadcrumbLink>
                  ) : (
                    <BreadcrumbPage>{item.name}</BreadcrumbPage>
                  )}
                  {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
                </BreadcrumbItem>
              ))}
            </BreadcrumbList>
          </Breadcrumb>
          <div className="ml-auto">{actions}</div>
        </header>
        <main className="p-4 sm:px-6 sm:py-0">{children}</main>
      </div>
    </div>
  );
};

DashboardView.displayName = "DashboardView";

export { DashboardView };
