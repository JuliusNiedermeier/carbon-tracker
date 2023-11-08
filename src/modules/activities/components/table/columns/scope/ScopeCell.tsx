"use client";

import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableCell } from "@/common/components/ui/table";
import { ScopeSelect } from "@/common/database/schema";
import { FC, useState } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CellContext } from "@tanstack/react-table";
import { buildCompoundScopeNumber } from "@/modules/activities/utils/scope-number";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Badge } from "@/common/components/ui/badge";
import { ActivityTableData } from "../../ActivityTable";
import { useMemoComponent } from "@/modules/activities/utils/use-memo-component";

type Props = {
  scopes: ScopeSelect[];
  ctx: CellContext<ActivityTableData, string | null>;
};

export const ScopeCell: FC<Props> = ({ scopes, ctx }) => {
  const Component = useMemoComponent(_ScopeCell);
  return <Component scopes={scopes} activityId={ctx.row.original.id} selectedScopeId={ctx.row.original.scopeId || null} cellId={ctx.cell.id} />;
};

type _Props = {
  scopes: ScopeSelect[];
  selectedScopeId: number | null;
  activityId: number;
  cellId: string;
};

const EMPTY = "empty";

const _ScopeCell: FC<_Props> = ({ scopes, activityId, cellId, selectedScopeId }) => {
  // Could abstracted as a util for use in every select cell
  const handleValueChange = async (value: string) => {
    const scopeId = value === EMPTY ? null : parseInt(value);
    if (scopeId !== null && isNaN(scopeId)) return;
    updateActvity(activityId, { scopeId });
  };

  return (
    <TableCell key={cellId}>
      <Select value={selectedScopeId?.toString() || EMPTY} onValueChange={handleValueChange}>
        <SelectTrigger className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value={EMPTY}>
            <div className="flex gap-1 items-center">
              <Cross2Icon className="w-12" />
              <span>Clear</span>
            </div>
          </SelectItem>
          <SelectSeparator />
          {scopes.map((scope) => (
            <SelectItem key={scope.id} value={scope.id.toString()}>
              <Badge className="w-12 text-center">{buildCompoundScopeNumber(scope.scope, scope.subScope)}</Badge>
              <span className="text-sm text-muted-foreground ml-2">{scope.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </TableCell>
  );
};
