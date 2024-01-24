import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";

export const LocationCell: FC<ActivityCellContext<"locationName">> = (props) => {
  return <Cell width={props.column.getSize()}>{props.getValue()}</Cell>;
};
