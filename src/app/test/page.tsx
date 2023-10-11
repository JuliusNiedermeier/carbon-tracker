"use client";

import { FC, useEffect, useMemo, useState } from "react";
import { CellContext, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/components/ui/table";
import { cn } from "@/common/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/common/components/ui/dropdown-menu";
import { Button } from "@/common/components/ui/button";
import { Input } from "@/common/components/ui/input";

const ch = createColumnHelper<(typeof activities)[number]>();

const activities = Array.from(new Array(49), () => ({
  a: Math.random(),
  b: Math.random(),
  c: Math.random(),
  d: Math.random(),
  e: Math.random(),
  f: Math.random(),
  g: Math.random(),
}));

export default function ActivityTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [optimisticActivities, setOptimisticActivities] = useState(activities);

  useEffect(() => console.log(optimisticActivities), [optimisticActivities]);

  const columns = useMemo(
    () => [
      ch.accessor("a", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
      ch.accessor("b", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <InputCell ctx={ctx} />,
      }),
      ch.accessor("c", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
      ch.accessor("d", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
      ch.accessor("e", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
      ch.accessor("f", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
      ch.accessor("g", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <DropdownCell />,
      }),
    ],
    []
  );

  const table = useReactTable({
    data: optimisticActivities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableMultiSort: true,
    enableRowSelection: true,
    meta: {
      update: (rowIndex: number, columnId: string, value: any) => {
        setOptimisticActivities((old) =>
          old.map((row, index) => {
            if (index !== rowIndex) return row;
            return { ...old[rowIndex], [columnId]: value };
          })
        );
      },
    },
  });

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                if (header.isPlaceholder) return <TableHead key={header.id} />;
                return flexRender(header.column.columnDef.header, header.getContext());
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className={cn({ "bg-muted": row.getIsSelected() })}>
              {row.getVisibleCells().map((cell) => flexRender(cell.column.columnDef.cell, cell.getContext()))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

const HeaderCell: FC = () => {
  return (
    <TableHead>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>Content</DropdownMenuContent>
      </DropdownMenu>
    </TableHead>
  );
};

const DropdownCell: FC = () => {
  return (
    <TableCell>
      {/* <button>Test</button> */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Trigger</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>Content</DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  );
};

const InputCell: FC<{ ctx: CellContext<any, any> }> = ({ ctx }) => {
  return (
    <TableCell>
      <Input value={ctx.getValue()} onChange={(e) => ctx.table.options.meta.update(ctx.row.index, ctx.column.id, e.currentTarget.value)} />
    </TableCell>
  );
};
