"use client";

import { CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ComponentProps, FC, useMemo, useState, SetStateAction, Dispatch, useRef, useCallback, memo } from "react";

function sleep(miliseconds: number) {
  var currentTime = new Date().getTime();
  while (currentTime + miliseconds >= new Date().getTime()) {}
}

type Data = { id: number; a: number; b: number; c: number; d: number };

const initialData: Data[] = Array.from(new Array(100)).map((_, index) => ({ id: index, a: 0, b: 0, c: 0, d: 0 }));

const columnHelper = createColumnHelper<Data>();

export default () => {
  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      columnHelper.accessor("id", { cell: (ctx) => ctx.getValue() }),
      columnHelper.accessor("a", { cell: (ctx) => <CheapComponent ctx={ctx} setData={setData} column="a" /> }),
      columnHelper.accessor("b", { cell: (ctx) => <CheapComponent ctx={ctx} setData={setData} column="b" /> }),
      columnHelper.accessor("c", { cell: (ctx) => <CheapComponent ctx={ctx} setData={setData} column="c" /> }),
      columnHelper.accessor("d", { cell: (ctx) => <CheapComponent ctx={ctx} setData={setData} column="d" /> }),
    ],
    [setData]
  );

  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() });

  return (
    <table>
      {table.getRowModel().rows.map((row) => (
        <tr key={row.id}>
          {row.getVisibleCells().map((cell) => (
            <td key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</td>
          ))}
        </tr>
      ))}
    </table>
  );
};

const CheapComponent: FC<{ ctx: CellContext<Data, Data["a"]>; setData: Dispatch<SetStateAction<Data[]>>; column: string }> = ({ ctx, setData, column }) => {
  const value = ctx.getValue();

  const handleUpdate = useCallback<ComponentProps<typeof ExpensiveComponent>["onUpdate"]>(
    (value) => {
      setData((prev) => {
        return prev.map((data) => (data.id === ctx.row.original.id ? { ...data, [column]: value } : data));
      });
    },
    [setData]
  );

  return <ExpensiveComponent value={value} onUpdate={handleUpdate} />;
};

const ExpensiveComponent: FC<{ value: number; onUpdate: (value: number) => void }> = ({ value, onUpdate }) => {
  sleep(1);

  const handleInput: Required<ComponentProps<"input">>["onInput"] = (e) => {
    onUpdate(parseInt(e.currentTarget.value));
  };

  return <input type="number" value={value} onInput={handleInput} />;
};
