import { Label } from "@/common/components/ui/label";
import { Select, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableHead } from "@/common/components/ui/table";
import { FC } from "react";

export const CategoryHeader: FC = () => {
  return (
    <TableHead className="py-2 pt-6">
      <Label htmlFor="source-select" className="pl-3">
        Category
      </Label>
      <Select>
        <SelectTrigger id="source-select" className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
      </Select>
    </TableHead>
  );
};
