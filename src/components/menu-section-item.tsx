import React, { type FC, type HTMLAttributes, type ReactNode } from "react";

import { cva, type VariantProps } from "class-variance-authority";

import { Link } from "@/components-ui-lib/link";
import { SheetClosePrimitive } from "@/components-ui-lib/sheet";
import { type Icon } from "@/types-ui-lib";
import { cn } from "@/utils-ui-lib/classnames";

const menuSectionItemVariants = cva(
  cn(
    "text-muted-foreground group text-sm flex items-center gap-x-2 truncate block",
    "data-[active=true]:font-medium data-[active=true]:text-highlight-foreground",
  ),
  {
    variants: {
      variant: {
        group: "h-8",
        page: "h-8 hover:text-foreground",
      },
    },
    defaultVariants: {
      variant: "page",
    },
  },
);

export interface MenuSectionItemProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof menuSectionItemVariants> {
  href: string;
  isActive: boolean;
  children: ReactNode;
  Icon?: Icon;
  isMobile?: boolean;
}

const MenuSectionItem: FC<MenuSectionItemProps> = ({
  Icon,
  href,
  variant,
  isActive,
  isMobile,
  children,
}) => {
  const menuItemStyles = cn(menuSectionItemVariants({ variant }));

  const icon = Icon && (
    <div
      className={cn(
        "grid size-6 place-content-center rounded-md border",
        "group-hover:bg-border",
        isActive && "bg-highlight",
      )}
    >
      <Icon size={16} />
    </div>
  );

  const content = href.startsWith("/") ? (
    <Link href={href} data-active={isActive} className={menuItemStyles}>
      {icon}
      {children}
    </Link>
  ) : (
    <a
      href={href}
      rel="noreferrer noopener"
      data-active={isActive}
      className={menuItemStyles}
    >
      {icon}
      {children}
    </a>
  );

  if (isMobile) {
    return <SheetClosePrimitive asChild>{content}</SheetClosePrimitive>;
  }

  return content;
};

export { MenuSectionItem };
