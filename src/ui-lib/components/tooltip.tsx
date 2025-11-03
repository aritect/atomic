
import { useState, useCallback } from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";
import * as React from "react";

import { cn } from "@/utils-ui-lib/classnames";

const TooltipProvider = ({
	delayDuration = 0,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Provider>) => {
	return (
		<TooltipPrimitive.Provider
			delayDuration={delayDuration}
			{...props}
		/>
	);
};

TooltipProvider.displayName = TooltipPrimitive.Provider.displayName;

const Tooltip = ({
	open,
	children,
	useTouch = false,
  defaultOpen = false,
  onOpenChange = undefined,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Root> & {
	useTouch?: boolean;
}) => {
	const [customOpen, setCustomOpen] = useState(defaultOpen || false);

	const openTooltip = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    event.persist();

    if (onOpenChange) {
      onOpenChange(true);
    } else {
      setCustomOpen(true);
    }
	}, [onOpenChange]);

  const toggleTooltip = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    event.persist();

    if (onOpenChange) {
      onOpenChange(!open);
    } else {
      setCustomOpen(!customOpen);
    }
  }, [onOpenChange, customOpen, open]);

  const closeTooltip = useCallback((event: React.TouchEvent | React.MouseEvent) => {
    event.persist();

    if (onOpenChange) {
      onOpenChange(false);
    } else {
      setCustomOpen(false);
    }
  }, [onOpenChange]);

	return (
		<TooltipProvider>
			<TooltipPrimitive.Root
				open={typeof open !== "undefined" ? open : customOpen}
        onOpenChange={!useTouch ? setCustomOpen : undefined}
				{...props}
			>
				{React.Children.map(children, (child) => {
					if (React.isValidElement(child) && useTouch) {
						return React.cloneElement(
							child as React.ReactElement<React.HTMLAttributes<HTMLElement>>,
							{
								onTouchStart: toggleTooltip,
                onMouseEnter: openTooltip,
                onMouseLeave: closeTooltip,
							},
						);
					}
					return child;
				})}
			</TooltipPrimitive.Root>
		</TooltipProvider>
	);
};

Tooltip.displayName = TooltipPrimitive.Root.displayName;

const TooltipTrigger = ({
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Trigger>) => {
	return <TooltipPrimitive.Trigger {...props} />;
};

TooltipTrigger.displayName = TooltipPrimitive.Trigger.displayName;

const TooltipContent = ({
	className,
	sideOffset = 0,
	children,
	...props
}: React.ComponentProps<typeof TooltipPrimitive.Content>) => {
	return (
		<TooltipPrimitive.Portal>
			<TooltipPrimitive.Content
				sideOffset={sideOffset}
				className={cn(
					"bg-tooltip-background text-tooltip-foreground animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 w-fit rounded-md px-2.5 py-1 text-xs text-balance",
					className,
				)}
				{...props}
			>
        <TooltipPrimitive.Arrow className="bg-tooltip-background fill-tooltip-background z-50 size-2.5 translate-y-[calc(-50%_-_2px)] rotate-45 rounded-[2px]" />
				<span className="z-100 relative">{children}</span>
			</TooltipPrimitive.Content>
		</TooltipPrimitive.Portal>
	);
};

TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider };
