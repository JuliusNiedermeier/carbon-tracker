import { FC, HTMLAttributes, PropsWithChildren, forwardRef } from "react";
import { cn } from "../utils";

interface Props extends HTMLAttributes<HTMLHeadingElement> {}

export const PageTitle = forwardRef<HTMLHeadingElement, Props>(({ className, ...props }, ref) => {
  return <h1 className={cn("text-3xl font-medium", className)} {...props} ref={ref} />;
});

PageTitle.displayName = "PageTitle";

export const PageSubtitle: FC<PropsWithChildren> = ({ children }) => {
  return <h3 className="text-muted-foreground">{children}</h3>;
};
