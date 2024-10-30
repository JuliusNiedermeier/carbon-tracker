import { ComponentProps, FC, useMemo } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { Badge } from "@/app/_components/ui/badge";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { useUnits } from "../../../_hooks/use-units";
import { FooterCell } from "../../table-utils/cells/footer-cell";

export const UnitFooter: FC<ActivityHeaderContext<"unit.abbreviation">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();
  const units = useUnits();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(() => {
    return units.map((unit) => ({
      value: unit.id.toString(),
      component: (
        <div className="flex items-center gap-3 overflow-hidden">
          <Badge>{unit.abbreviation}</Badge>
          <span className="text-ellipsis overflow-hidden">{unit.name}</span>
        </div>
      ),
    }));
  }, [units]);

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    setCandidate((previous) => ({ ...previous, unitId: Number(value) }));
  };

  return (
    <FooterCell columnID={props.column.id} width={props.column.getSize()}>
      <SelectCell
        width={props.column.getSize()}
        pinned={props.column.getIsPinned()}
        start={props.column.getStart("left")}
        options={options}
        value={candidate.unitId?.toString() || ""}
        onValueChange={handleValueChange}
      />
    </FooterCell>
  );
};
