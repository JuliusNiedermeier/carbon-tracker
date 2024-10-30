"use client";

import { CellContext, flexRender, getCoreRowModel, getExpandedRowModel, getGroupedRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ComponentProps, Fragment, useRef } from "react";
import { cn } from "@/app/_utils/cn";
import { columnMetadata, columns } from "./_columns";
import { Activity, useActivities } from "./_hooks/use-activities";
import { useVirtualizer } from "@/app/_utils/use-virtualizer";
import { Toolbar } from "./_components/toolbar/toolbar";
import { Row } from "./_components/row";
import { ScrollArea, ScrollAreaViewport } from "@/app/_components/ui/scroll-area";
import { ActivityGridConsumer, ActivityGridProvider } from "./_components/providers/activity-grid-provider";
import { ActivityCreatorProvider } from "./_components/providers/activity-creator-provider";
import { useParams } from "next/navigation";
import { ActivityCreatorRow } from "./_components/activity-creator/row";

const rowHeight = 40;

const ActivitiesPage = ({ params }: { params: { company: string } }) => {
  const { company: rootCompanySlug } = useParams<{ company: string }>();

  const gridScrollElement = useRef<HTMLDivElement>(null);
  const footerScrollElement = useRef<HTMLDivElement>(null);

  const activities = useActivities(params.company);

  const table = useReactTable({
    data: activities.data || [],
    columns,
    initialState: { columnPinning: { left: ["row-select"] } },
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
    <ActivityGridProvider rootCompanySlug={rootCompanySlug}>
      <ActivityCreatorProvider>
        <div className="p-2 bg-gray-200x h-screen flex flex-col gap-2">
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
                        ? flexRender<CellContext<Activity, any>>(columnMetadata.find((meta) => meta.ID === cell.column.id)?.groupToggle, cell.getContext())
                        : cell.getIsAggregated()
                        ? flexRender(cell.column.columnDef.aggregatedCell ?? "Missing aggregated cell", cell.getContext())
                        : flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Fragment>
                  ))}
                </Row>
              ))}
              <div className="block" style={{ height: `${virtualizer.padding.end}px` }} />
            </ScrollAreaViewport>
          </ScrollArea>
          <ActivityGridConsumer>
            {(context) =>
              context?.showActivityCreator && (
                <div className="flex w-full gap-2">
                  <ScrollArea className="flex-1 bg-white" direction="horizontal" showBar={false}>
                    <div className="absolute top-0 left-0 w-full h-10 border border-neutral-300 rounded-md z-10 pointer-events-none" />
                    <ScrollAreaViewport onScroll={createScrollHandler(gridScrollElement.current)} ref={footerScrollElement} className="h-full">
                      <ActivityCreatorRow height={rowHeight}>
                        {table.getFooterGroups()[0].headers.map((footer) => flexRender(footer.column.columnDef.footer, footer.getContext()))}
                      </ActivityCreatorRow>
                    </ScrollAreaViewport>
                  </ScrollArea>
                  {/* <ActivityCreatorToolbar height={rowHeight} table={table} /> */}
                </div>
              )
            }
          </ActivityGridConsumer>
        </div>
      </ActivityCreatorProvider>
    </ActivityGridProvider>
  );
};

export default ActivitiesPage;
