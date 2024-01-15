"use client";

import {
  RowData,
  TableMeta,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getGroupedRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Fragment, useEffect, useRef } from "react";
import { cn } from "@/app/_utils/cn";
import { columns } from "./_columns";
import { Activity, useActivities } from "./_hooks/use-activities";
import { useVirtualizer } from "@/app/_utils/use-virtualizer";
import { Toolbar } from "./_components/toolbar";
import { GroupToggleCell } from "./_components/table-utils/cells/group-toggle-cell";
import { ScopesProvider } from "./_components/providers/scopes-provider";
import { UnitsProvider } from "./_components/providers/units-provider";
import { updateActivity } from "./_server-actions/update-activity";
import { useUpdateActivity } from "./_hooks/use-update-activity";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateCell: (activityID: Activity["id"], columnID: keyof Activity, value: string) => void;
  }
}

const rowHeight = 40;

const ActivitiesPage = ({ params }: { params: { company: string } }) => {
  const scrollElement = useRef<HTMLDivElement>(null);

  const activities = useActivities(params.company);
  const updateActivity = useUpdateActivity(params.company);

  const updateCell: TableMeta<Activity>["updateCell"] = (activityID, column, value) => {
    updateActivity({ activityID, column, value });
  };

  const table = useReactTable({
    data: activities.data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    meta: { updateCell },
  });

  const virtualizerKey = "row";
  const virtualizer = useVirtualizer({ key: virtualizerKey, items: table.getRowModel().rows, scrollElement, estimateItemSize: rowHeight });

  return (
    <UnitsProvider>
      <ScopesProvider>
        <div className="p-2 bg-gray-200 h-screen flex flex-col gap-2">
          <div className="py-2">
            <Toolbar table={table} />
          </div>
          <div className="card">
            <div className="scroll-container" ref={scrollElement}>
              {table.getHeaderGroups().map((headerGroup) => (
                <div key={headerGroup.id} className="header-row">
                  {headerGroup.headers.map((header) => (
                    <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
                  ))}
                </div>
              ))}
              <div className="block" style={{ height: `${virtualizer.padding.start}px` }} />
              {virtualizer.items.map((row, index) => (
                <div
                  key={row.id}
                  className={cn("row", { "row--preserved": index === virtualizer.preservedIndex })}
                  style={{ height: rowHeight }}
                  {...virtualizer.createItemProps(row.index.toString())}
                >
                  {row.getVisibleCells().map((cell) => (
                    <Fragment key={cell.id}>
                      {cell.getIsGrouped()
                        ? flexRender(GroupToggleCell, cell.getContext())
                        : cell.getIsAggregated()
                        ? flexRender(cell.column.columnDef.aggregatedCell ?? "Missing aggregated cell", cell.getContext())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Fragment>
                  ))}
                </div>
              ))}
              <div className="sticky bottom-0 h-12 bg-gray-100 border-gray-200 border-t-8"></div>
              <div className="block" style={{ height: `${virtualizer.padding.end}px` }} />
            </div>
          </div>
        </div>
      </ScopesProvider>
    </UnitsProvider>
  );
};

export default ActivitiesPage;
