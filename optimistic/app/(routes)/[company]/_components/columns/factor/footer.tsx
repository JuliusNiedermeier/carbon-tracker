import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { FactorBaseCell } from "./base-cell";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { useEmissionFactorInfo } from "../../../_hooks/use-emission-factor-info";

export const FactorFooter: FC<ActivityHeaderContext<"factor.co2e">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const { data: factorInfo } = useEmissionFactorInfo(candidate.emissionFactorId ?? null);

  const handleSelectFactor: ComponentProps<typeof FactorBaseCell>["factorFinder"]["onSelect"] = (factorID) => {
    setCandidate((candidate) => ({ ...candidate, emissionFactorId: factorID }));
  };

  return (
    <FactorBaseCell
      width={props.column.getSize()}
      pinned={props.column.getIsPinned()}
      start={props.column.getStart("left")}
      co2e={factorInfo?.co2e}
      factorUnitID={factorInfo?.unit.id}
      amountUnitID={candidate.unitId}
      factorFinder={{
        emissionFactorID: candidate.emissionFactorId ?? null,
        onSelect: handleSelectFactor,
        initialFilters: { searchTerm: candidate.description, amountUnitID: candidate.unitId },
      }}
    />
  );
};
