import { FC } from "react";
import { ActivityHeaderContext } from "../ClientActivityTable";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../../../common/components/ui/dropdown-menu";
import { Button } from "../../../../../common/components/ui/button";
import { SortIndicator } from "./SortingIndicator";
import { ArrowDownIcon, ArrowUpIcon, CheckIcon, EyeNoneIcon } from "@radix-ui/react-icons";
import { SortDirection } from "@tanstack/react-table";
import { ArrowDownRightSquare } from "lucide-react";

interface Props {
  ctx: ActivityHeaderContext<any>;
  name: string;
}

export const ColumnHeader: FC<Props> = ({ ctx, name }) => {
  const handleSortingItemClick = (direction: SortDirection) => {
    const sortingState = ctx.column.getIsSorted();
    if (sortingState === direction) return ctx.column.clearSorting();
    ctx.column.toggleSorting(direction === "desc", true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full justify-between" onClick={ctx.column.getToggleSortingHandler()}>
          {name}
          <SortIndicator direction={ctx.column.getIsSorted()} />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="gap-4" onClick={() => handleSortingItemClick("asc")}>
          <ArrowUpIcon />
          Sort ascending
          {ctx.column.getIsSorted() === "asc" && <CheckIcon className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={() => handleSortingItemClick("desc")}>
          <ArrowDownIcon />
          Sort descending
          {ctx.column.getIsSorted() === "desc" && <CheckIcon className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4" disabled>
          <EyeNoneIcon />
          Hide column
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" disabled>
          <ArrowDownRightSquare size={16} />
          Default value
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
