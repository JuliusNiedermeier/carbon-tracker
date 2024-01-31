import { cn } from "@/app/_utils/cn";
import { ComponentProps, FC, PropsWithChildren } from "react";

type Props = ComponentProps<"div"> & {
  height: number;
  selected?: boolean;
};

export const Row: FC<PropsWithChildren<Props>> = ({ children, height, className, selected, ...props }) => {
  return (
    <div
      className={cn("flex w-min hover:bg-gray-100 focus-within:bg-gray-100 border-b border-gray-300 last-of-type:border-b-0", className, {
        "bg-gray-200": selected,
      })}
      style={{ height }}
      {...props}
    >
      {children}
    </div>
  );
};
