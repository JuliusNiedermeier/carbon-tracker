import { FC } from "react";
import { BaseCell } from "@/app/(routes)/[company]/_components/table-utils/cells/base-cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";

export const CompanyCell: FC<ActivityCellContext<"companyName">> = (props) => {
  return <BaseCell>{props.getValue()}</BaseCell>;
};
