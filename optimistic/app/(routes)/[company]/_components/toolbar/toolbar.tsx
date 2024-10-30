"use client";

import { ComponentProps, FC, useEffect, useMemo, useState } from "react";
import { Column, ColumnOrderState, Table } from "@tanstack/react-table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/app/_components/ui/dropdown-menu";
import { ArrowLeft, ChevronDown, ChevronsUpDown, Columns2, Eye, EyeOff, GripVertical, Plus } from "lucide-react";
import { Activity } from "../../_hooks/use-activities";
import { BulkDeleteButton } from "./bulk-delete-button";
import { Button } from "@/app/_components/ui/button";
import { columnMetadata } from "../../_columns";
import { useActivityGrid } from "../providers/activity-grid-provider";
import { cn } from "@/app/_utils/cn";
import { useActivityCreator } from "../providers/activity-creator-provider";
import { Reorder } from "framer-motion";

export const Toolbar: FC<{ table: Table<Activity> }> = ({ table }) => {
  const { showActivityCreator, setShowActivityCreator } = useActivityGrid();
  const { isValidCandidate, createActivity } = useActivityCreator();
  const [isDraggingColumn, setIsDraggingColumn] = useState(false);

  const columns = useMemo(() => {
    const columns = table.getAllLeafColumns().filter((column) => column.getCanHide() || column.getCanSort());
    return columns.map((column) => ({ column, meta: columnMetadata.find((meta) => meta.ID === column.id)! }));
  }, [table.getAllLeafColumns()]);

  const columnOrder = useMemo(() => columns.map(({ column }) => column.id), [columns]);

  const hiddenColumnIDs = useMemo(() => {
    const columnVisibilityState = table.getState().columnVisibility;
    return Object.keys(columnVisibilityState).filter((columnKey) => !columnVisibilityState[columnKey]);
  }, [table.getState]);

  const createColumnDropdownItemClickHandler = (column: Column<Activity>): ComponentProps<typeof DropdownMenuItem>["onSelect"] => {
    const handler = column.getToggleVisibilityHandler();

    return (e) => {
      e.preventDefault();
      if (isDraggingColumn) return;
      handler(e);
    };
  };

  const handleColumnReorder: ComponentProps<typeof Reorder.Group<ColumnOrderState[number]>>["onReorder"] = (newColumnOrder) => {
    table.setColumnOrder(newColumnOrder);
    // alert(JSON.stringify(newColumnOrder));
  };

  return (
    <div className="flex gap-4 items-center">
      <div className="flex items-center gap-4">
        <Button variant="ghost" className="gap-2">
          <ArrowLeft size="16" /> All footprints
        </Button>
        <h1 className="font-bold">Verwaltende GmbH</h1>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild className="ml-auto">
          <Button variant="outline" size="sm" className="gap-2 shadow-none">
            <Columns2 size="16" />
            Columns
            {hiddenColumnIDs.length > 0 && <span className="text-muted-foreground">{hiddenColumnIDs.length} hidden</span>}
            <ChevronsUpDown size="16" className="text-muted-foreground" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Reorder.Group axis="y" values={columnOrder} onReorder={handleColumnReorder}>
            {columns.map(({ column, meta }) => (
              <Reorder.Item key={column.id} value={column.id} onDragStart={() => setIsDraggingColumn(true)} onDragEnd={() => setIsDraggingColumn(false)}>
                <DropdownMenuItem className="gap-2" onSelect={createColumnDropdownItemClickHandler(column)}>
                  <GripVertical size="16" />
                  <span className="flex-1 mr-6">{meta.name}</span>
                  {column.getIsVisible() ? <Eye size="16" /> : <EyeOff size="16" className="opacity-50" />}
                </DropdownMenuItem>
              </Reorder.Item>
            ))}
          </Reorder.Group>
        </DropdownMenuContent>
      </DropdownMenu>
      {(table.getIsSomeRowsSelected() || table.getIsAllPageRowsSelected()) && <BulkDeleteButton table={table} />}
      <div className="flex items-center divide-x divide-neutral-700">
        {showActivityCreator && (
          <Button size="sm" className="gap-3 rounded-e-none" disabled={!isValidCandidate} onClick={createActivity}>
            <Plus size="16" /> Add activity
          </Button>
        )}
        <Button size="icon" onClick={() => setShowActivityCreator((show) => !show)} className={cn("h-8 w-8", { "rounded-s-none": showActivityCreator })}>
          {showActivityCreator ? <ChevronDown size="16" /> : <Plus size="16" />}
        </Button>
      </div>
    </div>
  );
};
