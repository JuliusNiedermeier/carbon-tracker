import { ComponentProps, FC, useMemo } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useUnits } from "../../../_hooks/use-units";
import { Cell } from "../../cell";
import { Badge } from "@/app/_components/ui/badge";
import { useActivityGrid } from "../../providers/activity-grid-provider";

export const UnitCell: FC<ActivityCellContext<"unit.abbreviation">> = (props) => {
  const { updateCell } = useActivityGrid();
  const units = useUnits();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () =>
      units.map((unit) => ({
        value: unit.id.toString(),
        component: (
          <div className="flex items-center gap-3 overflow-hidden">
            <Badge>{unit.abbreviation}</Badge>
            <span className="text-ellipsis overflow-hidden">{unit.name}</span>
          </div>
        ),
      })),
    [units]
  );

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    updateCell(props.row.original.id, "unitId", value ? Number(value) : null);
  };

  return (
    <SelectCell
      width={props.column.getSize()}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
      options={options}
      value={props.row.original.unitId?.toString() || ""}
      onValueChange={handleValueChange}
    />
  );
};
