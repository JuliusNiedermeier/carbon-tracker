import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { AmountBaseCell } from "./base-cell";
import { useQueryClient } from "@tanstack/react-query";
import { Activity } from "../../../_hooks/use-activities";

export const AmountCell: FC<ActivityCellContext<"amount">> = (props) => {
  const { updateCell, rootCompanySlug } = useActivityGrid();
  const qc = useQueryClient();

  const handleUpdate: ComponentProps<typeof AmountBaseCell>["onUpdate"] = (value, formula) => {
    updateCell(props.row.original.id, "amountFormula", formula);

    qc.setQueryData<Activity[]>(["list-activities", rootCompanySlug], (activities) =>
      activities?.map((activity) => (activity.id === props.row.original.id ? { ...activity, amount: value } : activity))
    );
  };

  return <AmountBaseCell width={props.column.getSize()} value={props.getValue()} formula={props.row.original.amountFormula} onUpdate={handleUpdate} />;
};
