import { SortIndicator } from "../../sort-indicator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { SortDirection } from "@tanstack/react-table";
import { FC, useEffect } from "react";
import { ArrowDown, ArrowUp, Check, Component, EyeOff } from "lucide-react";
import { ActivityDisplayHeaderContext } from "../../../_utils/cell-types";
import { Cell } from "../../cell";

type Props = { ctx: ActivityDisplayHeaderContext; title: string; description?: string };

export const Header: FC<Props> = (props) => {
  const handleSortingItemClick = (direction: SortDirection) => {
    const sortingState = props.ctx.column.getIsSorted();
    if (sortingState === direction) return props.ctx.column.clearSorting();
    props.ctx.column.toggleSorting(direction === "desc", true);
  };

  useEffect(() => {
    if (props.ctx.column.getIsResizing()) document.body.style.userSelect = "none";
    else document.body.style.userSelect = "";
  }, [props.ctx.column.getIsResizing()]);

  return (
    <DropdownMenu>
      <Cell className="overflow-visible px-0" width={props.ctx.header.getSize()}>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center px-3 py-4 font-medium w-full">
            <div className="mr-auto overflow-hidden">
              <span className="block">{props.title}</span>
              <span className="font-default text-xs text-muted-foreground">{props.description}</span>
            </div>
            <SortIndicator direction={props.ctx.column.getIsSorted()} />
          </div>
        </DropdownMenuTrigger>
        <div
          className="absolute right-[-2px] top-1 bottom-1 w-1 rounded-full bg-neutral-600 z-10 cursor-col-resize opacity-0 hover:opacity-100 active:opacity-100"
          onMouseDown={props.ctx.header.getResizeHandler()}
        />
      </Cell>

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
