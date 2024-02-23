import { FC } from "react";
import { Cell } from "../../cell";
import { ActivityDisplayHeaderContext } from "../../../_utils/cell-types";

export const BlankCell: FC<ActivityDisplayHeaderContext> = (props) => {
  return <Cell width={props.header.getSize()} pinned={props.column.getIsPinned()} start={props.column.getStart("left")} className="pointer-events-none"></Cell>;
};
