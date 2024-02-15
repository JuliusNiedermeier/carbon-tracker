import { ComponentProps, FC } from "react";
import { ActivityCellContext } from "../../../_utils/cell-types";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { FactorBaseCell } from "./base-cell";

export const FactorCell: FC<ActivityCellContext<"factor.co2e">> = (props) => {
  const { updateCell } = useActivityGrid();

  const handleFactorSelect: ComponentProps<typeof FactorBaseCell>["factorFinder"]["onSelect"] = (factorID) => {
    updateCell(props.row.original.id, "emissionFactorId", factorID);
  };

  return (
    <FactorBaseCell
      width={props.column.getSize()}
      co2e={props.getValue()}
      factorUnitID={props.row.original.factor?.unitId}
      amountUnitID={props.row.original.unitId}
      factorFinder={{
        emissionFactorID: props.row.original.emissionFactorId,
        onSelect: handleFactorSelect,
        initialFilters: { searchTerm: props.row.original.description, amountUnitID: props.row.original.unitId },
      }}
    />
  );
};
