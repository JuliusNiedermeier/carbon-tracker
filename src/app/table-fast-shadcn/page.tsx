"use client";

import { Checkbox } from "@/common/components/ui/checkbox";
import { Input } from "@/common/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { CellContext, createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { ComponentProps, FC, useMemo, useState, SetStateAction, Dispatch, useRef, useCallback, memo } from "react";

type Data = { id: number; input: string; a: number; b: number; c: number; d: number };

const initialData: Data[] = Array.from(new Array(100)).map((_, index) => ({ id: index, input: "", a: 0, b: 0, c: 0, d: 0 }));
const options = Array.from(new Array(3)).map((_, index) => index);

const columnHelper = createColumnHelper<Data>();

export default () => {
  const [data, setData] = useState(initialData);

  const columns = useMemo(
    () => [
      columnHelper.display({ id: "checkbox", cell: (ctx) => <FastCheckboxCell ctx={ctx} /> }),
      columnHelper.accessor("id", { cell: (ctx) => ctx.getValue() }),
      columnHelper.accessor("input", { cell: (ctx) => <FastInputCell ctx={ctx} setData={setData} column="input" /> }),
      columnHelper.accessor("a", { cell: (ctx) => <FastSelectCell ctx={ctx} setData={setData} column="a" /> }),
      columnHelper.accessor("b", { cell: (ctx) => <FastSelectCell ctx={ctx} setData={setData} column="b" /> }),
      columnHelper.accessor("c", { cell: (ctx) => <FastSelectCell ctx={ctx} setData={setData} column="c" /> }),
      columnHelper.accessor("d", { cell: (ctx) => <FastSelectCell ctx={ctx} setData={setData} column="d" /> }),
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

const FastCheckboxCell: FC<{ ctx: CellContext<Data, void> }> = ({ ctx }) => {
  const checked = ctx.row.getIsSelected();

  const handleUpdate = useCallback((checked: boolean) => ctx.row.getToggleSelectedHandler()(checked), []);

  const MemoizedComponent = useRef(memo(CheckboxCell));
  return <MemoizedComponent.current checked={checked} onUpdate={handleUpdate} />;
};

const CheckboxCell: FC<{ checked: boolean; onUpdate: (value: boolean) => void }> = ({ checked, onUpdate }) => {
  return <Checkbox checked={checked} onCheckedChange={onUpdate} />;
};

const FastInputCell: FC<{ ctx: CellContext<Data, Data["input"]>; setData: Dispatch<SetStateAction<Data[]>>; column: string }> = ({ ctx, setData, column }) => {
  const value = ctx.getValue();

  const handleUpdate = useCallback<ComponentProps<typeof InputCell>["onUpdate"]>(
    (value) => {
      setData((prev) => {
        return prev.map((data) => (data.id === ctx.row.original.id ? { ...data, [column]: value } : data));
      });
    },
    [setData]
  );

  const MemoizedComponent = useRef(memo(InputCell));
  return <MemoizedComponent.current value={value} onUpdate={handleUpdate} />;
};

const InputCell: FC<{ value: string; onUpdate: (value: string) => void }> = ({ value, onUpdate }) => {
  const handleInput: Required<ComponentProps<typeof Input>>["onInput"] = (e) => {
    onUpdate(e.currentTarget.value);
  };

  return <Input value={value} onInput={handleInput} />;
};

const FastSelectCell: FC<{ ctx: CellContext<Data, Data["a"]>; setData: Dispatch<SetStateAction<Data[]>>; column: string }> = ({ ctx, setData, column }) => {
  const value = ctx.getValue();

  const handleUpdate = useCallback<ComponentProps<typeof SelectCell>["onUpdate"]>(
    (value) => {
      setData((prev) => {
        return prev.map((data) => (data.id === ctx.row.original.id ? { ...data, [column]: value } : data));
      });
    },
    [setData]
  );

  const MemoizedComponent = useRef(memo(SelectCell));
  return <MemoizedComponent.current value={value} onUpdate={handleUpdate} />;
};

const SelectCell: FC<{ value: number; onUpdate: (value: number) => void }> = ({ value, onUpdate }) => {
  return (
    <Select value={value.toString()}>
      <SelectTrigger>
        <SelectValue placeholder="Placeholder" />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem value={option.toString()}>Option {option}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
