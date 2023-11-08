import { Badge } from "@/common/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableCell } from "@/common/components/ui/table";
import { UnitSelect } from "@/common/database/schema";
import { FC, useState } from "react";
import { ActivityCellContext } from "../../ActivityTable";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Cross2Icon } from "@radix-ui/react-icons";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

type Props = {
  units: UnitSelect[];
  ctx: ActivityCellContext<"unit.abbreviation">;
};

export const UnitCell: FC<Props> = ({ ctx, units }) => {
  const Component = useMemoComponent(_UnitCell);
  return <Component units={units} activityId={ctx.row.original.id} cellId={ctx.cell.id} selectedUnitId={ctx.row.original.unitId} />;
};

type _Props = {
  units: UnitSelect[];
  selectedUnitId: number | null;
  activityId: number;
  cellId: string;
};

const EMPTY = "empty";

const _UnitCell: FC<_Props> = ({ units, activityId, cellId, selectedUnitId }) => {
  const [loading, setLoading] = useState(false);

  // Could abstracted as a util for use in every select cell
  const handleValueChange = async (value: string) => {
    const unitId = value === EMPTY ? null : parseInt(value);
    if (unitId !== null && isNaN(unitId)) return;
    updateActvity(activityId, { unitId });
  };

  return (
    <TableCell key={cellId}>
      <Select value={selectedUnitId?.toString() || EMPTY} onValueChange={handleValueChange}>
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
