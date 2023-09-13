import { Badge } from "@/common/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableCell } from "@/common/components/ui/table";
import { UnitSelect } from "@/common/database/schema";
import { FC, useState } from "react";
import { ActivityCellContext } from "../../ClientActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";

interface Props {
  units: UnitSelect[];
  ctx: ActivityCellContext<"unit.abbreviation">;
}

export const UnitCell: FC<Props> = ({ units, ctx }) => {
  const [loading, setLoading] = useState(false);

  // Could abstracted as a util for use in every select cell
  const handleValueChange = async (unitId: string) => {
    if (!unitId) return;
    setLoading(true);
    try {
      await updateActvity(ctx.row.original.id, { unitId: parseInt(unitId) });
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
