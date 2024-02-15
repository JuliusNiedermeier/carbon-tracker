"use client";

import { ComponentProps, FC, useEffect } from "react";
import { Column, Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ChevronsUpDown, Columns2, Eye, EyeOff } from "lucide-react";
import { Activity } from "../../_hooks/use-activities";
import { BulkDeleteButton } from "./bulk-delete-button";
import { Button } from "@/app/_components/ui/button";

export const Toolbar: FC<{ table: Table<Activity> }> = ({ table }) => {
  const columnVisibility = table.getState().columnVisibility;

  const hiddenColumns = Object.keys(columnVisibility).filter((columnKey) => !columnVisibility[columnKey]);

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
            {hiddenColumns.length > 0 && <span className="text-muted-foreground">{hiddenColumns.length} hidden</span>}
            <ChevronsUpDown size="16" className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table.getAllLeafColumns().map((column) => (
            <DropdownMenuItem key={column.id} className="gap-8" onSelect={createColumnDropdownItemClickHandler(column)}>
              <span className="flex-1">{column.id}</span>
              {column.getIsVisible() ? <Eye size="16" /> : <EyeOff size="16" className="opacity-50" />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      {(table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected()) && <BulkDeleteButton table={table} />}
    </div>
  );
};
