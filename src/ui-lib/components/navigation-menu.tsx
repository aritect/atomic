import React from "react";

import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva, type VariantProps } from "class-variance-authority";

import { Image } from "@/components-ui-lib/image";
import { ChevronDownIcon } from "@/icons-ui-lib/chevron-down-icon";
import { cn } from "@/utils-ui-lib/classnames";

const NavigationMenuViewport = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Viewport>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport>
>(({ className, ...props }, ref) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        "origin-top-center bg-popover text-popover-foreground data-[state=open]:animate-menu-open data-[state=closed]:animate-menu-close data-[state=closed]:zoom-out-90 data-[state=open]:zoom-in-90 relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)] w-full overflow-hidden border md:w-[var(--radix-navigation-menu-viewport-width)]",
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

NavigationMenuViewport.displayName = NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      "relative z-50 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
));

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
));

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva("group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-normal transition-colors duration-global text-muted-foreground hover:text-accent-foreground focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50",);

const NavigationMenuTrigger = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenuPrimitive.Trigger
    ref={ref}
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDownIcon
      className="relative top-[1px] ml-1 h-3 w-3 transition duration-global group-data-[state=open]:rotate-180"
      aria-hidden="true"
    />
  </NavigationMenuPrimitive.Trigger>
));

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Content>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Content
    ref={ref}
    className={cn(
      "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out data-[motion=from-end]:slide-in-from-right-52 data-[motion=from-start]:slide-in-from-left-52 data-[motion=to-end]:slide-out-to-right-52 data-[motion=to-start]:slide-out-to-left-52 left-0 top-0 w-full md:absolute md:w-auto",
      className,
    )}
    {...props}
  />
));

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuIndicator = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Indicator>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.Indicator
    ref={ref}
    className={cn(
      "data-[state=visible]:animate-in data-[state=hidden]:animate-out data-[state=hidden]:fade-out data-[state=visible]:fade-in top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden",
      className,
    )}
    {...props}
  >
    <div className="bg-border relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
  </NavigationMenuPrimitive.Indicator>
));

NavigationMenuIndicator.displayName = NavigationMenuPrimitive.Indicator.displayName;

const navigationMenuDropdownListVariants = cva(
  "grid gap-x-3 gap-y-1 p-4 w-[400px] md:w-[480px] lg:w-[520px]",
  {
    variants: {
      variant: {
        "default": "lg:grid-cols-2",
        card: "lg:grid-cols-[.85fr_1fr]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface NavigationMenuDropdownListProps
  extends VariantProps<typeof navigationMenuDropdownListVariants> {
  children: React.ReactNode;
  className?: string;
}

const NavigationMenuDropdownList = React.forwardRef<
  HTMLUListElement,
  NavigationMenuDropdownListProps
>(({ className, variant, children }, ref) => (
  <ul
    ref={ref}
    className={cn(navigationMenuDropdownListVariants({ variant, className }))}
  >
    {children}
  </ul>
));

NavigationMenuDropdownList.displayName = "NavigationMenuDropdownList";

const navigationMenuDropdownItemVariants = cva(
  "rounded-md select-none no-underline outline-none",
  {
    variants: {
      variant: {
        "default":
          "block p-3 transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
        card: "from-muted/50 to-muted flex h-full w-full flex-col justify-end bg-gradient-to-b p-6",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

interface NavigationMenuDropdownItemProps
  extends VariantProps<typeof navigationMenuDropdownItemVariants> {
  title: string;
  href: string;
  cardImg?: string;
  cardImgAlt?: string;
  children: React.ReactNode;
}

const NavigationMenuDropdownItem = React.forwardRef<
  HTMLLIElement,
  NavigationMenuDropdownItemProps
>((
  {
    title,
    href,
    cardImg: cardImage,
    cardImgAlt: cardImageAlt,
    children,
    variant,
  },
  ref,
) => {
  const navigationMenuDropdownItemStyle = cn(navigationMenuDropdownItemVariants({ variant }),);

  const listItemContent = variant === "card" ? (
    <>
      {cardImage ? (
        <div className="relative flex-grow overflow-hidden">
          <Image
            src={cardImage}
            alt={cardImageAlt!}
            className="absolute inset-0 bottom-0 left-0 top-0 h-full w-full bg-cover"
          />
        </div>
      ) : (
        <div className="flex-grow" />
      )}
      <h4 className="mb-1 mt-3 text-base font-medium">{title}</h4>
      <p className="text-muted-foreground text-sm leading-6">{children}</p>
    </>
  ) : (
    <>
      <p className="text-foreground mb-1 text-sm font-medium">{title}</p>
      <p className="text-muted-foreground line-clamp-2 text-sm leading-6">
        {children}
      </p>
    </>
  );

  return (
    <li ref={ref} className={cn(variant === "card" && "row-span-3")}>
      <NavigationMenuLink
        href={href}
        className={navigationMenuDropdownItemStyle}
      >
        {listItemContent}
      </NavigationMenuLink>
    </li>
  );
});

NavigationMenuDropdownItem.displayName = "NavigationMenuDropdownItem";

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  NavigationMenuDropdownList,
  NavigationMenuDropdownItem,
};
