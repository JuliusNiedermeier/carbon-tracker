"use client";

import { ComponentProps, FC, useEffect, useMemo } from "react";
import { Column, Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ChevronsUpDown, Columns2, Eye, EyeOff } from "lucide-react";
import { Activity } from "../../_hooks/use-activities";
import { BulkDeleteButton } from "./bulk-delete-button";
import { Button } from "@/app/_components/ui/button";
import { columnMetadata } from "../../_columns";

export const Toolbar: FC<{ table: Table<Activity> }> = ({ table }) => {
  const columns = useMemo(() => {
    const columns = table.getAllLeafColumns().filter((column) => column.getCanHide() || column.getCanSort());
    return columns.map((column) => ({ column, meta: columnMetadata.find((meta) => meta.ID === column.id)! }));
  }, []);

  const hiddenColumnIDs = useMemo(() => {
    const columnVisibilityState = table.getState().columnVisibility;
    return Object.keys(columnVisibilityState).filter((columnKey) => !columnVisibilityState[columnKey]);
  }, [table.getState]);

  const createColumnDropdownItemClickHandler = (column: Column<Activity>): ComponentProps<typeof DropdownMenuItem>["onSelect"] => {
    const handler = column.getToggleVisibilityHandler();

    return (e) => {
      e.preventDefault();
      handler(e);
    };
  };

  return (
    <div className="flex gap-4 items-center">
      <h1 className="font-bold mr-auto">Activities</h1>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2 shadow-none">
            <Columns2 size="16" />
            Columns
            {hiddenColumnIDs.length > 0 && <span className="text-muted-foreground">{hiddenColumnIDs.length} hidden</span>}
            <ChevronsUpDown size="16" className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {columns.map(({ column, meta }) => (
            <DropdownMenuItem key={column.id} className="gap-8" onSelect={createColumnDropdownItemClickHandler(column)}>
              <span className="flex-1">{meta.name}</span>
              {column.getIsVisible() ? <Eye size="16" /> : <EyeOff size="16" className="opacity-50" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {(table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected()) && <BulkDeleteButton table={table} />}
    </div>
  );
};
