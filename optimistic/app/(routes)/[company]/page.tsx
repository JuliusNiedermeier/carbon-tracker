"use client";

import { flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ComponentProps, Fragment, useRef } from "react";
import { cn } from "@/app/_utils/cn";
import { columns } from "./_columns";
import { useActivities } from "./_hooks/use-activities";
import { useVirtualizer } from "@/app/_utils/use-virtualizer";
import { Toolbar } from "./_components/toolbar/toolbar";
import { GroupToggleCell } from "./_components/table-utils/cells/group-toggle-cell";
import { ScopesProvider } from "./_components/providers/scopes-provider";
import { UnitsProvider } from "./_components/providers/units-provider";
import { useUpdateActivity } from "./_hooks/use-update-activity";
import { Row } from "./_components/row";
import { ScrollArea, ScrollAreaViewport } from "@/app/_components/ui/scroll-area";
import { ActivityGridContext, ActivityGridProvider } from "./_components/providers/activity-grid-provider";
import { Button } from "@/app/_components/ui/button";
import { ChevronUp, Lock } from "lucide-react";
import { Cell } from "./_components/cell";

const rowHeight = 40;

const ActivitiesPage = ({ params }: { params: { company: string } }) => {
  const gridScrollElement = useRef<HTMLDivElement>(null);
  const footerScrollElement = useRef<HTMLDivElement>(null);

  const activities = useActivities(params.company);
  const updateActivity = useUpdateActivity(params.company);

  const updateCell: ActivityGridContext["updateCell"] = (activityID, column, value) => {
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
  });

  const virtualizerKey = "row";
  const virtualizer = useVirtualizer({ key: virtualizerKey, items: table.getRowModel().rows, scrollElement: gridScrollElement, estimateItemSize: rowHeight });

  const createScrollHandler = (slaveElement: HTMLElement | null): ComponentProps<"div">["onScroll"] => {
    return (e) => slaveElement?.scrollTo({ left: e.currentTarget.scrollLeft, behavior: "instant" });
  };

  return (
    <ActivityGridProvider value={{ updateCell }}>
      <UnitsProvider>
        <ScopesProvider>
          <div className="p-2 bg-gray-200 h-screen flex flex-col gap-2">
            <div className="py-2">
              <Toolbar table={table} />
            </div>
            <ScrollArea direction="both" className="w-full h-full bg-gray-50 rounded-md border border-gray-300">
              <ScrollAreaViewport onScroll={createScrollHandler(footerScrollElement.current)} ref={gridScrollElement} className="relative">
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
            <div className="flex w-full gap-2">
              <ScrollArea className="flex-1 bg-white border rounded-md" direction="horizontal" showBar={false}>
                <ScrollAreaViewport onScroll={createScrollHandler(gridScrollElement.current)} ref={footerScrollElement} className="h-full">
                  <div className="flex w-min" style={{ height: rowHeight }}>
                    {table.getFooterGroups()[0].headers.map((footer) => (
                      <Cell key={footer.id} width={footer.getSize()}></Cell>
                    ))}
                  </div>
                </ScrollAreaViewport>
              </ScrollArea>
              <div className="flex gap-1 items-center h-full bg-white rounded-md border p-1" style={{ height: rowHeight }}>
                <Button size="icon" variant="ghost" className="h-full">
                  <Lock size="16" />
                </Button>
                <Button className="h-full rounded-sm bg-emerald-600 text-emerald-200 gap-2 hover:bg-emerald-700">
                  Add activity <ChevronUp size="16" />
                </Button>
              </div>
            </div>
          </div>
        </ScopesProvider>
      </UnitsProvider>
    </ActivityGridProvider>
  );
};

export default ActivitiesPage;
