import { cn } from "@/app/_utils/cn";
import { ComponentProps, FC, PropsWithChildren } from "react";

type Props = ComponentProps<"div"> & {
  padding?: boolean;
};

export const BaseCell: FC<PropsWithChildren<Props>> = ({ children, padding, className, ...props }) => {
  return (
    <div
      className={cn(
        "flex-1 w-64",
        "relative flex h-full items-center bg-transparent whitespace-nowrap overflow-hidden text-ellipsis cursor-default text-sm text-gray-600 border-r border-gray-300 last:border-r-0 focus-within:ring-2 focus-within:ring-gray-600 focus-within:!border-transparent hover:bg-gray-200 focus-within:bg-gray-200 focus-within:z-10 focus-within:rounded-[1px] focus-within:text-gray-800 focus-within:font-medium focus-within:cursor-auto outline-none",
        { "px-3": padding ?? true },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
