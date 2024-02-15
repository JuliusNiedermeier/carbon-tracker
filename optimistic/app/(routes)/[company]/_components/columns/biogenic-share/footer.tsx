import { ComponentProps, FC } from "react";
import { ActivityHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { useActivityCreator } from "../../providers/activity-creator-provider";
import { Cell } from "../../cell";
import { Checkbox } from "@/app/_components/ui/checkbox";

export const BiogenicShareFooter: FC<ActivityHeaderContext<"biogenicShare">> = (props) => {
  const { candidate, setCandidate } = useActivityCreator();

  const onCheckedChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = (checked) => {
    setCandidate((previous) => ({ ...previous, biogenicShare: !!checked }));
  };

  return (
    <Cell width={props.column.getSize()}>
      <Checkbox checked={!!candidate.biogenicShare} onCheckedChange={onCheckedChange} />
    </Cell>
  );
};
