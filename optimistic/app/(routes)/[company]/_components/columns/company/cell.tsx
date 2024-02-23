import { FC } from "react";
import { Cell } from "@/app/(routes)/[company]/_components/cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";

export const CompanyCell: FC<ActivityCellContext<"companyName">> = (props) => {
  return (
    <Cell width={props.column.getSize()} pinned={props.column.getIsPinned()} start={props.column.getStart("left")}>
      {props.getValue()}
    </Cell>
  );
};
