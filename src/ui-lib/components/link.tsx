import React, { forwardRef } from "react";

const Link = forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<"a">
>(({ href, children, ...props }, ref) => (
  <a ref={ref} href={href} {...props}>
    {children}
  </a>
));

Link.displayName = "Link";

export { Link };
