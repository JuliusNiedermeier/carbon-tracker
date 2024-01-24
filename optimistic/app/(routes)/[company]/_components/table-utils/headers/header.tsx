import { SortIndicator } from "../../sort-indicator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { HeaderContext, SortDirection } from "@tanstack/react-table";
import { FC } from "react";
import { ArrowDown, ArrowDownRightSquare, ArrowUp, Check, Component, EyeOff } from "lucide-react";
import { ActivityDisplayHeaderContext } from "../../../_utils/cell-types";
import { Cell } from "../../cell";

type Props = { ctx: ActivityDisplayHeaderContext; title: string; description?: string };

export const Header: FC<Props> = (props) => {
  const handleSortingItemClick = (direction: SortDirection) => {
    const sortingState = props.ctx.column.getIsSorted();
    if (sortingState === direction) return props.ctx.column.clearSorting();
    props.ctx.column.toggleSorting(direction === "desc", true);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Cell className="flex items-center py-4 font-medium" width={props.ctx.header.getSize()}>
          <div className="mr-auto">
            <span className="block">{props.title}</span>
            <span className="font-default text-xs text-muted-foreground">{props.description}</span>
          </div>
          <SortIndicator direction={props.ctx.column.getIsSorted()} />
        </Cell>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuItem className="gap-4" onClick={() => handleSortingItemClick("asc")}>
          <ArrowUp size="16" />
          Sort ascending
          {props.ctx.column.getIsSorted() === "asc" && <Check size="16" className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={() => handleSortingItemClick("desc")}>
          <ArrowDown size="16" />
          Sort descending
          {props.ctx.column.getIsSorted() === "desc" && <Check size="16" className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuItem className="gap-4" onClick={props.ctx.column.getToggleGroupingHandler()}>
          <Component size="16" />
          Group
          {props.ctx.column.getIsGrouped() && <Check size="16" className="ml-auto" />}
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="gap-4" onClick={props.ctx.column.getToggleVisibilityHandler()}>
          <EyeOff size="16" />
          Hide column
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
