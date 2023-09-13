import { PropsWithChildren, forwardRef } from "react";
import { cn } from "@/common/utils";
import { type HTMLAttributes } from "react";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {}

export const Container = forwardRef<HTMLDivElement, PropsWithChildren<ContainerProps>>(({ className, ...props }, ref) => {
  return <div className={cn("max-w-[90rem] mx-auto px-4", className)} {...props} ref={ref} />;
});

Container.displayName = "Container";
