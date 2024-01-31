import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";

export const Co2eCell: FC<ActivityCellContext<"co2e">> = (props) => {
  return <Cell width={props.column.getSize()}>{props.getValue()}</Cell>;
};
