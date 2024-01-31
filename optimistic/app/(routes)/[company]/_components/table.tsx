import { cn } from "@/app/_utils/cn";
import { ComponentProps, PropsWithChildren, forwardRef } from "react";

type Props = ComponentProps<"div"> & {
  // columnWidths: number[];
  // rowHeight: number;
};

export const Table = forwardRef<HTMLDivElement, PropsWithChildren<Props>>(({ children, className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative overflow-auto w-full h-full", className)}
      // style={{ gridTemplateColumns: columnWidths.map((width) => `${width}px`).join(" "), gridTemplateRows: `repeat(auto-fill, ${rowHeight}px)` }}
      {...props}
    >
      {children}
    </div>
  );
});

Table.displayName = "Table";
