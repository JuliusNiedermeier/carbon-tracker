import { Select, SelectContent, SelectItem } from "@/app/_components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ComponentProps, FC, ReactNode, useState } from "react";
import { Cell } from "../../cell";
import { ColumnPinningPosition } from "@tanstack/react-table";

type Props = {
  value: string;
  onValueChange?: (value: string | null) => any;
  options: { value: string; component: ReactNode }[];
  width: number;
  pinned?: ColumnPinningPosition;
  start?: number;
};

export const SelectCell: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClear: ComponentProps<typeof SelectContent>["onClear"] = () => {
    setOpen(false);
    props.onValueChange?.(null);
  };

  return (
    <Select open={open} onOpenChange={setOpen} value={props.value} onValueChange={props.onValueChange}>
      <Cell padding={false} width={props.width} pinned={props.pinned} start={props.start}>
        <SelectTrigger className="px-3 h-full w-full outline-none">{props.options.find((option) => option.value === props.value)?.component}</SelectTrigger>
      </Cell>
      {open && (
        <SelectContent onClear={handleClear}>
          {props.options.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.component}
            </SelectItem>
          ))}
        </SelectContent>
      )}
    </Select>
  );
};
