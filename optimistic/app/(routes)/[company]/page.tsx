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
import { Toolbar } from "./_components/toolbar/toolbar";
import { GroupToggleCell } from "./_components/table-utils/cells/group-toggle-cell";
import { ScopesProvider } from "./_components/providers/scopes-provider";
import { UnitsProvider } from "./_components/providers/units-provider";
import { updateActivity } from "./_server-actions/update-activity";
import { useUpdateActivity } from "./_hooks/use-update-activity";
import { Row } from "./_components/row";
import { ScrollArea, ScrollAreaViewport } from "@/app/_components/ui/scroll-area";

declare module "@tanstack/react-table" {
  interface TableMeta<TData extends RowData> {
    updateCell: <Key extends keyof Activity>(activityID: Activity["id"], columnID: Key, value: Activity[Key]) => void;
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
    defaultColumn: {
      size: 200,
      minSize: 80,
      maxSize: 500,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
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
          <ScrollArea direction="both" className="w-full h-full bg-gray-50 rounded-md border border-gray-300">
            <ScrollAreaViewport ref={scrollElement} className="relative">
              {table.getHeaderGroups().map((headerGroup) => (
                <Row key={headerGroup.id} height={rowHeight} className="sticky top-0 bg-gray-100 z-20 shadow-sm">
                  {headerGroup.headers.map((header) => (
                    <Fragment key={header.id}>{flexRender(header.column.columnDef.header, header.getContext())}</Fragment>
                  ))}
                </Row>
              ))}
              <div className="block" style={{ height: `${virtualizer.padding.start}px` }} />
              {virtualizer.items.map((row, index) => (
                <Row
                  key={row.id}
                  height={rowHeight}
                  selected={row.getIsSelected()}
                  className={cn({ "row--preserved": index === virtualizer.preservedIndex })}
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
                </Row>
              ))}
              {/* <div className="sticky bottom-0 h-12 bg-gray-100 border-gray-200 border-t-8"></div> */}
              <div className="block" style={{ height: `${virtualizer.padding.end}px` }} />
            </ScrollAreaViewport>
          </ScrollArea>
        </div>
      </ScopesProvider>
    </UnitsProvider>
  );
};

export default ActivitiesPage;
