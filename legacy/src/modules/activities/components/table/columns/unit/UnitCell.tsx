import { Badge } from "@/common/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableCell } from "@/common/components/ui/table";
import { UnitSelect } from "@/common/database/schema";
import { FC, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Cross2Icon } from "@radix-ui/react-icons";

interface Props {
  units: UnitSelect[];
  ctx: ActivityCellContext<"unit.abbreviation">;
}

const EMPTY = "empty";

export const UnitCell: FC<Props> = ({ units, ctx }) => {
  const [loading, setLoading] = useState(false);

  // Could abstracted as a util for use in every select cell
  const handleValueChange = async (value: string) => {
    const unitId = value === EMPTY ? null : parseInt(value);
    if (unitId !== null && isNaN(unitId)) return;
    setLoading(true);
    try {
      await updateActvity(ctx.row.original.id, { unitId });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell key={ctx.cell.id}>
      <Select value={ctx.row.original.unit?.id.toString()} onValueChange={handleValueChange}>
        <SelectTrigger className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value={EMPTY}>
            <div className="flex gap-1 items-center">
              <Cross2Icon className="w-12" />
              <span>Clear</span>
            </div>
          </SelectItem>
          {units.map((unit) => (
            <SelectItem key={unit.id} value={unit.id.toString()}>
              <Badge className="min-w-12">{unit.abbreviation}</Badge>
              <span className="text-sm text-muted-foreground ml-2">{unit.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
};
