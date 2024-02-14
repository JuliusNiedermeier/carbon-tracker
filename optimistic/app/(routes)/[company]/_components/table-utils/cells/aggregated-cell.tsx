import { FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { Cell } from "../../cell";

export const AggregatedCell: FC<ActivityCellContext<any>> = (props) => {
  return <Cell width={props.column.getSize()}>{props.getValue()}</Cell>;
};
