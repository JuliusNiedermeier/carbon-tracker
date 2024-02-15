import { cn } from "@/app/_utils/cn";
import { numberFormat } from "@/app/_utils/number-formats";
import { AlertTriangle } from "lucide-react";
import { ComponentProps, FC } from "react";

export type Props = ComponentProps<"div"> & {
  value: number | null;
};

export const EmissionFactorValue: FC<Props> = ({ value, className, ...restProps }) => {
  const isMissing = value === null || isNaN(value);

  return (
    <div className={cn("flex items-center gap-2", { "text-muted-foreground font-normal text-orange-400": isMissing }, className)} {...restProps}>
      <span className="flex-1 text-right">{isMissing ? "Missing" : numberFormat.format(Number(value))}</span>
      {isMissing && <AlertTriangle size="16" />}
    </div>
  );
};
