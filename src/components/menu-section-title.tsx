import React, { type FC } from "react";

interface MenuSectionTitleProps {
  children: React.ReactNode;
}

const MenuSectionTitle: FC<MenuSectionTitleProps> = ({ children }) => (
  <div className="pb-3">
    <p className="text-foreground text-sm font-medium">{children}</p>
  </div>
);

export { MenuSectionTitle };
