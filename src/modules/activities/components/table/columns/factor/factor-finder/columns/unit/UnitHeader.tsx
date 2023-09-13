import { Badge } from "@/common/components/ui/badge";
import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableHead } from "@/common/components/ui/table";
import { UnitSelect } from "@/common/database/schema";
import { FC } from "react";

type UnitSelection = number[] | null;

interface Props {
  units: Pick<UnitSelect, "id" | "abbreviation" | "name">[];
  selection: UnitSelection;
  onSelectionChange: (selection: UnitSelection) => any;
}

export const UnitHeader: FC<Props> = ({ units, selection, onSelectionChange }) => {
  const handleValueChange = (value: string) => {
    const parsedValue = parseInt(value);
    onSelectionChange(isNaN(parsedValue) ? null : [parsedValue]);
  };

  return (
    <TableHead className="py-2 px- pt-6">
      <Label htmlFor="unit-select" className="pl-3">
        Unit
      </Label>
      <Select value={selection?.at(0)?.toString() || "all"} onValueChange={handleValueChange}>
        <SelectTrigger id="unit-select" className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap overflow-hidden">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="all">
            <span>All</span>
          </SelectItem>
          <SelectSeparator />
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id.toString()}>
              <Badge className="min-w-12">{unit.abbreviation}</Badge>
              <span className="text-sm text-muted-foreground ml-2">{unit.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableHead>
  );
};
