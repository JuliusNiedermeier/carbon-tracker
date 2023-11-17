"use client";

import { FC, Suspense, useEffect, useMemo, useState } from "react";

import {
  CellContext,
  DeepKeys,
  DeepValue,
  HeaderContext,
  SortingState,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../../../common/components/ui/table";
import { ActivitySelect, EmissionFactorSelect, EmissionFactorSourceSelect, ScopeSelect, UnitSelect } from "@/common/database/schema";
// Header
import { SelectHeader } from "./columns/select/SelectHeader";
import { DescriptionHeader } from "./columns/description/DescriptionHeader";
import { ScopeHeader } from "./columns/scope/ScopeHeader";
import { AmountHeader } from "./columns/amount/AmountHeader";
import { UnitHeader } from "./columns/unit/UnitHeader";
import { FactorHeader } from "./columns/factor/FactorHeader";
import { EmissionHeader } from "./columns/emission/EmissionHeader";
import { YearHeader } from "./columns/year/YearHeader";
import { ResponsibilityHeader } from "./columns/responsibility/ResponsibilityHeader";
import { Header as DoubleCountingHeader } from "./columns/doublecounting/Header";
import { Header as BiogenicShareHeader } from "./columns/biogenicshare/Header";
import { Header as NotesHeader } from "./columns/notes/Header";
// Cells
import { SelectCell } from "./columns/select/SelectCell";
import { DescriptionCell } from "./columns/description/DescriptionCell";
import { ScopeCell } from "./columns/scope/ScopeCell";
import { AmountCell } from "./columns/amount/AmountCell";
import { UnitCell } from "./columns/unit/UnitCell";
import { FactorCell } from "./columns/factor/FactorCell";
import { EmissionCell } from "./columns/emission/EmissionCell";
import { YearCell } from "./columns/year/YearCell";
import { ResponsibilityCell } from "./columns/responsibility/ResponsibilityCell";
import { Cell as DoubleCountingCell } from "./columns/doublecounting/Cell";
import { Cell as BiogenicShareCell } from "./columns/biogenicshare/Cell";
import { Cell as NotesCell } from "./columns/notes/Cell";

import { ActivityCreator } from "@/modules/activities/components/ActivityCreator";
import { PageTitle } from "@/common/components/PageTitle";
import { cn } from "@/common/utils";
import { BulkActionPane } from "./bulk-actions/BulkActionPane";
import { SortOrderSwitcher } from "./SortOrderSwitcher";
import { buildCompoundScopeNumber } from "@/modules/activities/utils/scope-number";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { TableDataUpdater, createTableDataUpdater } from "../../utils/update-table-data";

export type ActivityTableData = ActivitySelect & {
  scope: ScopeSelect | null;
  unit: UnitSelect | null;
  factor: (EmissionFactorSelect & { unit: UnitSelect }) | null;
};

interface Props {
  locationId: number;
  activities: ActivityTableData[];
  scopes: ScopeSelect[];
  units: UnitSelect[];
  emissionFactorSources: EmissionFactorSourceSelect[];
  emissionFactorYears: number[];
}

export type ActivityHeaderContext<DeepKey extends DeepKeys<ActivityTableData>> = HeaderContext<ActivityTableData, DeepValue<ActivityTableData, DeepKey>>;
export type ActivityCellContext<DeepKey extends DeepKeys<ActivityTableData>> = CellContext<ActivityTableData, DeepValue<ActivityTableData, DeepKey>>;
export type ActivityDisplayHeaderContext = HeaderContext<ActivityTableData, unknown>;
export type ActivityDisplayCellContext = CellContext<ActivityTableData, unknown>;

export type TableOptionsMeta = { update: TableDataUpdater };

const ch = createColumnHelper<ActivityTableData>();

export const ActivityTable: FC<Props> = ({ locationId, activities, scopes, units, emissionFactorSources, emissionFactorYears }) => {
  // const router = useRouter();
  // const supabase = createClientComponentClient();

  // const channel = useMemo(() => {
  //   if (!supabase) return;
  //   return supabase.channel("activities");
  // }, [supabase]);

  // useEffect(() => {
  //   if (!supabase || !channel) return;

  //   channel.on("postgres_changes", { event: "*", schema: "public", table: "activity", filter: `location_id=eq.${locationId}` }, router.refresh);
  //   channel.subscribe();

  //   return () => {
  //     supabase.removeChannel(channel);
  //   };
  // }, [supabase, channel, router]);

  const [sorting, setSorting] = useState<SortingState>([]);
  const [rowSelection, setRowSelection] = useState({});

  const columns = useMemo(
    () => [
      ch.display({
        id: "Select",
        header: (ctx) => <SelectHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <SelectCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("description", {
        id: "Description",
        header: (ctx) => <DescriptionHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <DescriptionCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("year", {
        id: "Year",
        header: (ctx) => <YearHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <YearCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("notes", {
        id: "Notes",
        header: (ctx) => <NotesHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <NotesCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("responsibility", {
        id: "Responsibility",
        header: (ctx) => <ResponsibilityHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <ResponsibilityCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor(({ scope }) => (scope ? buildCompoundScopeNumber(scope.scope, scope.subScope) : null), {
        id: "Scope",
        header: (ctx) => <ScopeHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <ScopeCell ctx={ctx} scopes={scopes} key={ctx.cell.id} />,
      }),
      ch.accessor("amount", {
        id: "Amount",
        header: (ctx) => <AmountHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <AmountCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("unit.abbreviation", {
        id: "Unit",
        header: (ctx) => <UnitHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <UnitCell ctx={ctx} units={units} key={ctx.cell.id} />,
      }),
      ch.accessor("factor.co2e", {
        id: "Factor",
        header: (ctx) => <FactorHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => (
          <FactorCell ctx={ctx} units={units} emissionFactorSources={emissionFactorSources} emissionFactorYears={emissionFactorYears} key={ctx.cell.id} />
        ),
      }),
      ch.accessor("co2e", {
        id: "Emission",
        header: (ctx) => <EmissionHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <EmissionCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("doubleCounting", {
        id: "DoubleCounting",
        header: (ctx) => <DoubleCountingHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <DoubleCountingCell ctx={ctx} key={ctx.cell.id} />,
      }),
      ch.accessor("biogenicShare", {
        id: "BiogenicShare",
        header: (ctx) => <BiogenicShareHeader ctx={ctx} key={ctx.header.id} />,
        cell: (ctx) => <BiogenicShareCell ctx={ctx} key={ctx.cell.id} />,
      }),
    ],
    [scopes, units, emissionFactorSources, emissionFactorYears]
  );

  const table = useReactTable({
    data: activities,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    state: { sorting, rowSelection },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    enableMultiSort: true,
    enableRowSelection: true,
    meta: { update: () => alert("Optimistic updates are not implemented yet") },
  });

  const showBulkActionPage = table.getIsSomePageRowsSelected() || table.getIsAllPageRowsSelected();

  return (
    <div className="grid gap-8">
      <div className="flex items-center justify-between gap-4">
        <PageTitle>Activities</PageTitle>
        {showBulkActionPage && <BulkActionPane table={table} />}
        {sorting.length > 1 && <SortOrderSwitcher table={table} />}
      </div>

      <div className="rounded-md border overflow-x-auto">
        <Suspense fallback="Loading...">
          <Table id="table-main">
            <colgroup>
              <col width="30px" />
              <col width="25%" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
              <col width="" />
            </colgroup>

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
        </Suspense>
      </div>

      <div className="sticky bottom-4">
        <ActivityCreator locationId={locationId} />
      </div>
    </div>
  );
};
