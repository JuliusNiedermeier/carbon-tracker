import { EmissionFactorFinderDisplayHeaderContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { ComponentProps, FC } from "react";
import { Cell } from "../../cell";
import { Category } from "./category";
import { useFactorFinder } from "../../factor-finder";
import { CheckCircle2, X } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import { useActivityGrid } from "@/app/(routes)/[company]/_components/providers/activity-grid-provider";

export const CategoryFooter: FC<EmissionFactorFinderDisplayHeaderContext> = (props) => {
  const { selectedFactorInfo, activityID } = useFactorFinder();
  const { updateCell } = useActivityGrid();

  const handleUnlinkFactorClick: ComponentProps<typeof Button>["onClick"] = () => {
    updateCell(activityID, "emissionFactorId", null);
  };

  return (
    <Cell className="flex-1 gap-4 pl-4" padding={false}>
      <Button variant="secondary" className="gap-2 hover:text-red-600" onClick={handleUnlinkFactorClick}>
        <X className="" size="16" />
        Unlink factor
      </Button>
      <CheckCircle2 className="text-emerald-400" />
      <Category categories={selectedFactorInfo?.categories || []} />
    </Cell>
  );
};
