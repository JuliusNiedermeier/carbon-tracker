import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useActivityGrid } from "../../providers/activity-grid-provider";

const firstYear = 2015;
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(currentYear - firstYear + 1), (v, i) => i + firstYear);

const options = years.map((year) => ({ value: year.toString(), component: <span className="block w-full text-left">{year}</span> }));

export const YearCell: FC<ActivityCellContext<"year">> = (props) => {
  const { updateCell } = useActivityGrid();

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    updateCell(props.row.original.id, "year", !value ? null : BigInt(value));
  };

  return <SelectCell width={props.column.getSize()} options={options} value={props.getValue()?.toString() || ""} onValueChange={handleValueChange} />;
};
