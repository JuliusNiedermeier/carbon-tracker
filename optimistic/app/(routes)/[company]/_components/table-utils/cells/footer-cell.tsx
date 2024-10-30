import { ComponentProps, FC, PropsWithChildren } from "react";
import { Button } from "@/app/_components/ui/button";
import { Lock } from "lucide-react";
import { useActivityGrid } from "../../providers/activity-grid-provider";
import { useActivityCreator } from "../../providers/activity-creator-provider";

type Props = {
  width: number;
  start: number;
  columnID: string;
};

export const FooterCell: FC<PropsWithChildren<Props>> = ({ children, width, start, columnID }) => {
  const { rowHeight } = useActivityGrid();
  const { setLockedColumns, lockedColumns } = useActivityCreator();

  const isLocked = lockedColumns.includes(columnID);

  const handleLockClick: ComponentProps<typeof Button>["onClick"] = () => {
    setLockedColumns((lockedColumns) => {
      const index = lockedColumns.indexOf(columnID);
      if (index < 0) return [columnID, ...lockedColumns];
      return lockedColumns.toSpliced(index, 1);
    });
  };

  return (
    <div style={{ width, left: start }} className="sticky">
      <div style={{ height: rowHeight }}>{children}</div>
      <div className="w-full px-1 pt-1">
        <Button variant={isLocked ? "default" : "ghost"} size="sm" className="w-full" onClick={handleLockClick}>
          <Lock size="12" />
        </Button>
      </div>
    </div>
  );
};
