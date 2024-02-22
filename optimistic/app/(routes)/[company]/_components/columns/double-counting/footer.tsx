import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { SelectCell } from "../../table-utils/cells/select-cell";

const options = [
  { value: "true", component: <span className="block text-left">Yes</span> },
  { value: "false", component: <span className="block text-left">No</span> },
] as const satisfies ComponentProps<typeof SelectCell>["options"];

export const DoubleCountingFooter: FC<ActivityHeaderContext<"doubleCounting">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    setCandidate((previous) => ({ ...previous, doubleCounting: value === "true" ? true : value === "false" ? false : null }));
  };

  return <SelectCell width={props.column.getSize()} options={options} value={String(candidate.doubleCounting)} onValueChange={handleValueChange} />;
};
