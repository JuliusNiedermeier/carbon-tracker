import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";

type YearSelection = number[] | null;

interface Props {
  years: number[];
  selection: YearSelection;
  onSelectionChange: (selection: YearSelection) => any;
}

export const YearHeader: FC<Props> = ({ years, selection, onSelectionChange }) => {
  const handleValueChange = (value: string) => {
    const parsedValue = parseInt(value);
    onSelectionChange(isNaN(parsedValue) ? null : [parsedValue]);
  };

  return (
    <TableHead className="py-2 px-2 pt-6">
      <Label htmlFor="source-select" className="pl-3">
        Year
      </Label>
      <Select value={selection?.toString() || "all"} onValueChange={handleValueChange}>
        <SelectTrigger id="source-select" className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap text-foreground">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="all">
            <span>All</span>
          </SelectItem>
          <SelectSeparator />
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableHead>
  );
};
