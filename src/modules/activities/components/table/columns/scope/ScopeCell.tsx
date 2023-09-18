"use client";

import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/common/components/ui/select";
import { TableCell } from "@/common/components/ui/table";
import { ScopeSelect } from "@/common/database/schema";
import { FC, useState } from "react";
import { JoinedActivity } from "../../ActivityTable";
import { Cross2Icon } from "@radix-ui/react-icons";
import { CellContext } from "@tanstack/react-table";
import { buildCompoundScopeNumber } from "@/modules/activities/utils/scope-number";
import { updateActvity } from "@/modules/activities/server-actions/update-activity";
import { Badge } from "@/common/components/ui/badge";

interface Props {
  scopes: ScopeSelect[];
  ctx: CellContext<JoinedActivity, string | null>;
}

export const ScopeCell: FC<Props> = ({ scopes, ctx }) => {
  const [loading, setLoading] = useState(false);

  // Could abstracted as a util for use in every select cell
  const handleValueChange = async (value: string) => {
    setLoading(true);
    try {
      await updateActvity(ctx.row.original.id, { scopeId: parseInt(value) });
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TableCell key={ctx.cell.id}>
      <Select value={ctx.row.original.scope?.id.toString()} onValueChange={handleValueChange}>
        <SelectTrigger className="border-none shadow-none hover:bg-muted gap-2 whitespace-nowrap">
          <SelectValue placeholder="Not selected" />
        </SelectTrigger>
        <SelectContent position="item-aligned">
          <SelectItem value="">
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
