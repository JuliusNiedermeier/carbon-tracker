import { EmissionFactorFinderCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { FC } from "react";
import { Cell } from "../../cell";
import { Category } from "./category";
import { useFactorFinder } from "../../factor-finder";
import { Check, CheckCircle2 } from "lucide-react";

export const CategoryCell: FC<EmissionFactorFinderCellContext<"categoryPath">> = (props) => {
  const { selectedFactorID } = useFactorFinder();
  return (
    <Cell className="flex-1 items-center gap-4">
      {selectedFactorID === props.row.original.id && <Check size="16" className="text-emerald-400" />}
      <Category categories={props.getValue()?.nodes.map((cat) => cat.name) || []} />
    </Cell>
  );
};
