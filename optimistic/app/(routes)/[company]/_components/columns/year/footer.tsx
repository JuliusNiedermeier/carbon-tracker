import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { options } from "./cell";

export const YearFooter: FC<ActivityHeaderContext<"year">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    setCandidate((previous) => ({ ...previous, year: value ? BigInt(value) : null }));
  };

  return <SelectCell width={props.column.getSize()} options={options} value={candidate.year?.toString() || ""} onValueChange={handleValueChange} />;
};
