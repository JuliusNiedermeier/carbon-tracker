import { Label } from "@/common/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableHead } from "@/common/components/ui/table";
import { EmissionFactorSourceSelect } from "@/common/database/schema";
import { FC } from "react";

type SourceSelection = number[] | null;

interface Props {
  sources: Pick<EmissionFactorSourceSelect, "id" | "name">[];
  selection: SourceSelection;
  onSelectionChange: (selection: SourceSelection) => any;
}

export const SourceHeader: FC<Props> = ({ sources, selection, onSelectionChange }) => {
  const handleValueChange = (value: string) => {
    const parsedValue = parseInt(value);
    onSelectionChange(isNaN(parsedValue) ? null : [parsedValue]);
  };

  return (
    <TableHead className="py-2 px-2 pt-6">
      <Label htmlFor="source-select" className="pl-3">
        Source
      </Label>
      <Select value={selection?.toString() || "all"} onValueChange={handleValueChange}>
        <SelectTrigger id="source-select" className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap text-foreground overflow-hidden">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="all">
            <span>All</span>
          </SelectItem>
          <SelectSeparator />
          {sources.map((source) => (
            <SelectItem key={source.id} value={source.id.toString()}>
              <span>{source.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableHead>
  );
};
