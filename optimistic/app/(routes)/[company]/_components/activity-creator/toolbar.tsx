import { ComponentProps, FC } from "react";
import { useActivityCreator } from "../providers/activity-creator-provider";
import { Button } from "@/app/_components/ui/button";
import { ChevronUp, Lock } from "lucide-react";
import { ActivityInsert } from "@/app/_database/schema";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { Activity } from "../../_hooks/use-activities";
import { cn } from "@/app/_utils/cn";

const nonLockableColumnIDs = ["select", "company", "co2e"];

export const ActivityCreatorToolbar: FC<{ height: number; table: Table<Activity> }> = (props) => {
  const { isValidCandidate, createActivity, candidate, setLockedColumns, lockedColumns } = useActivityCreator();

  const createColumnLockSelectHandler = (columnID: string): ComponentProps<typeof DropdownMenuItem>["onSelect"] => {
    return (e) => {
      e.preventDefault();
      setLockedColumns((lockedColumns) => {
        const index = lockedColumns.indexOf(columnID);
        if (index < 0) return [columnID, ...lockedColumns];
        return lockedColumns.toSpliced(index, 1);
      });
    };
  };

  return (
    <div className="flex gap-1 items-center h-full bg-white rounded-md border p-1" style={{ height: props.height }}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="h-full">
            <Lock size="16" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start" className="-translate-x-[5px] -translate-y-1">
          {props.table
            .getAllLeafColumns()
            .filter((column) => !nonLockableColumnIDs.includes(column.id))
            .map((column) => (
              <DropdownMenuItem key={column.id} className="gap-3" onSelect={createColumnLockSelectHandler(column.id)}>
                <Lock size="14" className={cn({ "opacity-10": !lockedColumns.includes(column.id) })} /> {column.id}
              </DropdownMenuItem>
            ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button
        className="h-full rounded-sm bg-emerald-600 text-emerald-200 gap-2 hover:bg-emerald-700"
        disabled={!isValidCandidate}
        onClick={() => createActivity(candidate as ActivityInsert)}
      >
        Add activity <ChevronUp size="16" />
      </Button>
    </div>
  );
};
