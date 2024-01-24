import { ComponentProps, FC, useMemo } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useUnits } from "../../../_hooks/use-units";
import { Cell } from "../../cell";

export const UnitCell: FC<ActivityCellContext<"unit.abbreviation">> = (props) => {
  const units = useUnits();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () => units.map((unit) => ({ value: unit.id.toString(), component: <span>{unit.abbreviation}</span> })),
    [units]
  );

  return (
    <Cell padding={false} width={props.column.getSize()}>
      <SelectCell options={options} value={props.row.original.scopeId?.toString() || ""} onValueChange={() => {}} />
    </Cell>
  );
};
