import { FC } from "react";
import { BaseCell } from "@/app/(routes)/[company]/_components/table-utils/cells/base-cell";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";

export const FactorCell: FC<ActivityCellContext<"factor.co2e">> = (props) => {
  return <BaseCell>{props.getValue()}</BaseCell>;
};
