import { Select, SelectContent, SelectItem } from "@/app/_components/ui/select";
import { SelectTrigger } from "@radix-ui/react-select";
import { ComponentProps, FC, ReactNode, useState } from "react";

type Props = {
  value: string;
  onValueChange?: (value: string | null) => any;
  options: { value: string; component: ReactNode }[];
};

export const SelectCell: FC<Props> = (props) => {
  const [open, setOpen] = useState(false);

  const handleClear: ComponentProps<typeof SelectContent>["onClear"] = () => {
    setOpen(false);
    props.onValueChange?.(null);
  };

  return (
    <Select open={open} onOpenChange={setOpen} value={props.value} onValueChange={props.onValueChange}>
      <SelectTrigger className="cell text-left">{props.options.find((option) => option.value === props.value)?.component}</SelectTrigger>
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
