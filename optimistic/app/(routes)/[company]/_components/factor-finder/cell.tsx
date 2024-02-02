import { cn } from "@/app/_utils/cn";
import { ComponentProps, PropsWithChildren, forwardRef } from "react";

type Props = ComponentProps<"div"> & {
  width?: number;
  padding?: boolean;
};

export const Cell = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ children, width, padding, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "relative flex h-full items-center whitespace-nowrap overflow-hidden text-ellipsis text-sm text-gray-600",
        { "px-4": padding ?? true },
        className
      )}
      style={{ width: `${width || 300}px` }}
      {...props}
    >
      {children}
    </div>
  );
});

Cell.displayName = "Cell";
