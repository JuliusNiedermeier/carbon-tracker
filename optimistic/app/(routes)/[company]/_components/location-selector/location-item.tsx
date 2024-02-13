import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_utils/cn";
import { Check } from "lucide-react";
import { FC } from "react";

export const LocationItem: FC<{ name: string; selected: boolean; onSelect: () => any; onDelete: () => any }> = (props) => {
  return (
    <div className={cn("p-4 hover:bg-neutral-100 cursor-pointer flex items-center gap-4", { "bg-neutral-200": props.selected })} onClick={props.onSelect}>
      {props.selected && <Check size="16" />}
      <span className="font-medium">{props.name}</span>
      <Button
        size="sm"
        variant="ghost"
        className="ml-auto hover:text-destructive hover:bg-destructive/10"
        onClick={(e) => {
          e.stopPropagation();
          props.onDelete();
        }}
      >
        Delete
      </Button>
    </div>
  );
};
