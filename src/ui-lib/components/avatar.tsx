import React from "react";

import * as AvatarPrimitive from "@radix-ui/react-avatar";
import Boring, { type AvatarProps } from "boring-avatars";

import { cn } from "@/utils-ui-lib/classnames";

const Avatar = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

const AvatarImage = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    ref={ref}
    className={cn("aspect-square h-full w-full", className)}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

const AvatarFallback = React.forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    ref={ref}
    className={cn(
      "bg-muted flex h-full w-full items-center justify-center rounded-full",
      className,
    )}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

const BoringWithDefault = Boring as { default?: typeof Boring };
const RealBoringAvatar = typeof BoringWithDefault.default !== "undefined"
  ? BoringWithDefault.default
  : Boring;

const AvatarBoringFallback = React.forwardRef<
  React.ElementRef<typeof AvatarFallback>,
  Omit<AvatarProps, "size"> & { className?: string }
>(({ className, ...props }, ref) => {
  const { name, variant = "marble", ...rest } = props;

  return (
    <AvatarFallback ref={ref} className={className}>
      <RealBoringAvatar size={40} name={name} variant={variant} {...rest} />
    </AvatarFallback>
  );
});

AvatarBoringFallback.displayName = "AvatarBoringFallback";

export { Avatar, AvatarImage, AvatarFallback, AvatarBoringFallback };
