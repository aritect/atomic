import React from "react";

import { type DocsItem } from "@/types/docs";

import { MenuSectionItem } from "./menu-section-item";
import { MenuSectionTitle } from "./menu-section-title";

interface MenuSectionProps {
  pathname: string;
  title: string;
  items: DocsItem[];
  isVisible: boolean;
  isMobile?: boolean;
}

const MenuSection = ({
  pathname,
  title,
  items,
  isVisible,
  isMobile,
}: MenuSectionProps) => isVisible && (
      <div className="grid gap-y-0.5">
        <MenuSectionTitle>{title}</MenuSectionTitle>
        {items.map((item) => (
          <MenuSectionItem
            href={item.href}
            isActive={item.href === pathname}
            isMobile={isMobile}
            key={item.id}
          >
            {item.label}
          </MenuSectionItem>
        ))}
      </div>
);
export { MenuSection };
