import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "../../../_utils/cell-types";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { TransitionInput } from "@/app/_components/transition-input";
import { Cell } from "../../cell";
import { FooterCell } from "../../table-utils/cells/footer-cell";

export const DescriptionFooter: FC<ActivityHeaderContext<"description">> = (props) => {
  const { setCandidate, candidate } = useActivityCreator();

  const handleUpdate: ComponentProps<typeof TransitionInput>["onInput"] = (value) => {
    setCandidate((previous) => ({ ...previous, description: value }));
  };

  return (
    <FooterCell columnID={props.column.id} width={props.column.getSize()}>
      <Cell padding={false} pinned={props.column.getIsPinned()} start={props.column.getStart("left")} className="items-stretch" width={props.column.getSize()}>
        <TransitionInput value={candidate.description || ""} onInput={handleUpdate} className="bg-transparent outline-none px-3 w-full" />
      </Cell>
    </FooterCell>
  );
};
