"use client";

import { FC, PropsWithRef, memo, useCallback, useMemo, useRef, useState } from "react";
import { CellContext, SortingState, createColumnHelper, flexRender, getCoreRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../common/components/ui/table";
import { cn } from "@/common/utils";

const ch = createColumnHelper<(typeof activities)[number]>();

const activities = Array.from(new Array(100), () => ({
  a: "A",
  b: "A",
}));

export default function ActivityTable() {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const [optimisticActivities, setOptimisticActivities] = useState(activities);

  // useEffect(() => console.log(optimisticActivities), [optimisticActivities]);

  const columns = useMemo(
    () => [
      ch.accessor("a", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <BaseCell ctx={ctx} />,
      }),
      ch.accessor("b", {
        header: (ctx) => <HeaderCell />,
        cell: (ctx) => <BaseCell ctx={ctx} />,
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
  return <TableHead>Header</TableHead>;
};

// const memoizeCell = <Props extends {}>(component: FC<Props>, ctx: CellContext<any, any>, ) => {
//   const CachedCell = memo(component);

//   return <CachedCell  />;
// };

const BaseCell: FC<{ ctx: CellContext<any, any> }> = ({ ctx }) => {
  const value = ctx.getValue();

  // update function cannot be included in dependency array
  const onChange = useCallback((value: string) => ctx.table.options.meta.update(ctx.row.index, ctx.column.id, value), [ctx.row.index, ctx.column.id]);

  const [options] = useState(["A", "B", "C"]);

  const CachedExpensiveComponent = useRef(memo(ExpensiveComponent));

  return <CachedExpensiveComponent.current value={value} options={options} onChange={onChange} />;
};

const ExpensiveComponent: FC<{ value: string; options: string[]; onChange: (value: string) => void }> = ({ value, options, onChange }) => {
  console.log("Rerender expensive component with value", value);
  return (
    <TableCell>
      <select value={value} onChange={(e) => onChange(e.currentTarget.value)}>
        {options.map((option) => (
          <option value={option}>{option}</option>
        ))}
      </select>
    </TableCell>
  );
};

const CellContextProxy: FC = <CTX extends CellContext<any, any>>(ctx: CTX) => {
  const proxy = new Proxy<CTX>(ctx, {get: (target, path, reciever) => {
    
  }});
  proxy
};

// const stabelize = (values: Record<string, any>) => {
//   const stableValues = {}
//   Object.keys(values).forEach(key => {
//     if(typeof values[key] === "function") {

//     }
//   })
// }
