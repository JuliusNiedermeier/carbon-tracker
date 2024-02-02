"use client";

import { forwardRef, ElementRef, ComponentPropsWithoutRef } from "react";
import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";

import { cn } from "@/app/_utils/cn";

type ScrollAreaProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  direction?: "both" | ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Scrollbar>["orientation"];
  showBar?: boolean;
};

export const ScrollArea = forwardRef<ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ className, children, direction = "vertical", showBar = true, ...props }, ref) => (
    <ScrollAreaPrimitive.Root ref={ref} className={cn("relative overflow-hidden", className)} {...props}>
      {children}
      {(direction === "vertical" || direction === "both") && <ScrollBar orientation="vertical" visible={showBar} />}
      {(direction === "horizontal" || direction === "both") && <ScrollBar orientation="horizontal" visible={showBar} />}
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
);
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName;

export const ScrollAreaViewport = forwardRef<ElementRef<typeof ScrollAreaPrimitive.Viewport>, ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Viewport>>(
  ({ className, children, ...props }, ref) => (
    <ScrollAreaPrimitive.Viewport ref={ref} className={cn("h-full w-full", className)} {...props}>
      {children}
    </ScrollAreaPrimitive.Viewport>
  )
);
ScrollAreaViewport.displayName = ScrollAreaPrimitive.Viewport.displayName;

type ScrollBarProps = ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar> & {
  visible?: boolean;
};

const ScrollBar = forwardRef<ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>, ScrollBarProps>(
  ({ className, orientation = "vertical", visible = true, ...props }, ref) => (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        "flex touch-none select-none transition-colors",
        !visible && "hidden",
        orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]",
        orientation === "horizontal" && "h-2.5 flex-col border-t border-t-transparent p-[1px]",
        className
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-neutral-300" />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
);
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName;
