import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { FooterCell } from "../../table-utils/cells/footer-cell";

const options = [
  { value: "true", component: <span className="block text-left">Yes</span> },
  { value: "false", component: <span className="block text-left">No</span> },
] as const satisfies ComponentProps<typeof SelectCell>["options"];

export const BiogenicShareFooter: FC<ActivityHeaderContext<"biogenicShare">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    setCandidate((previous) => ({ ...previous, biogenicShare: value === "true" ? true : value === "false" ? false : null }));
  };

  return (
    <FooterCell columnID={props.column.id} width={props.column.getSize()}>
      <SelectCell
        width={props.column.getSize()}
        options={options}
        value={String(candidate.biogenicShare)}
        onValueChange={handleValueChange}
        pinned={props.column.getIsPinned()}
        start={props.column.getStart("left")}
      />
    </FooterCell>
  );
};
