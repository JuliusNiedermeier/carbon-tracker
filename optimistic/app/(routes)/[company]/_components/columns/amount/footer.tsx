import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { AmountBaseCell } from "./base-cell";
import { useActivityCreator } from "../../providers/activity-creator-provider";

export const AmountFooter: FC<ActivityHeaderContext<"amount">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const handleUpdate: ComponentProps<typeof AmountBaseCell>["onUpdate"] = (value, formula) => {
    setCandidate((candidate) => ({ ...candidate, amount: value, amountFormula: formula }));
  };

  return <AmountBaseCell width={props.column.getSize()} value={candidate.amount ?? null} formula={candidate.amountFormula ?? null} onUpdate={handleUpdate} />;
};
