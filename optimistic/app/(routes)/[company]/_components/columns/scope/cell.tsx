import { ComponentProps, FC, useMemo } from "react";
import { ActivityCellContext } from "@/app/(routes)/[company]/_utils/cell-types";
import { SelectCell } from "../../table-utils/cells/select-cell";
import { useScopes } from "../../../_hooks/use-scopes";
import { Badge } from "@/app/_components/ui/badge";
import { useActivityGrid } from "../../providers/activity-grid-provider";

export const ScopeCell: FC<ActivityCellContext<"scope.name">> = (props) => {
  const { updateCell } = useActivityGrid();
  const scopes = useScopes();

  const options = useMemo<ComponentProps<typeof SelectCell>["options"]>(
    () =>
      scopes.map((scope) => ({
        value: scope.id.toString(),
        component: (
          <div className="flex items-center gap-3 overflow-hidden">
            <Badge>
              {scope.scope}.{scope.subScope}
            </Badge>
            <span className="text-ellipsis overflow-hidden">{scope.name}</span>
          </div>
        ),
      })),
    [scopes]
  );

  const handleValueChange: ComponentProps<typeof SelectCell>["onValueChange"] = (value) => {
    updateCell(props.row.original.id, "scopeId", value ? Number(value) : null);
  };

  return <SelectCell width={props.column.getSize()} options={options} value={props.row.original.scopeId?.toString() || ""} onValueChange={handleValueChange} />;
};
